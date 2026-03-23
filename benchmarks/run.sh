#!/usr/bin/env bash
# =============================================================================
# Ergo Benchmark Orchestrator
#
# Runs all 9 scenarios × 6 frameworks × 3 trials sequentially.
# Each server runs alone (no inter-container CPU contention).
#
# Prerequisites:
#   - Docker Desktop or Docker Engine
#   - 2+ physical CPU cores (core 0 for server, core 1 for k6)
#   - ~4 GB free RAM
#
# Usage:
#   cd benchmarks
#   chmod +x run.sh
#   ./run.sh
#
# To run a subset:
#   FRAMEWORKS="ergo fastify" ./run.sh
#   SCENARIOS="05-full-pipeline" ./run.sh
#   TRIALS=1 ./run.sh
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------------------------------------------------------------------------
# Configuration (overridable via environment)
# ---------------------------------------------------------------------------
FRAMEWORKS="${FRAMEWORKS:-node-http express fastify hono koa ergo}"
SCENARIOS="${SCENARIOS:-01-baseline-get 02-param-get 03-auth-get 04-json-post 05-full-pipeline 06-concurrency-ramp 07-production-stack 08-conditional-get 09-rate-limit-flood}"
TRIALS="${TRIALS:-3}"
NETWORK="bench"
SERVER_CPUS="${SERVER_CPUS:-0}"
K6_CPUS="${K6_CPUS:-1}"
SERVER_MEMORY="${SERVER_MEMORY:-512m}"
K6_MEMORY="${K6_MEMORY:-1g}"
K6_IMAGE="${K6_IMAGE:-grafana/k6:latest}"
SERVER_READINESS_WAIT="${SERVER_READINESS_WAIT:-3}"

RESULTS_DIR="$SCRIPT_DIR/results"
SCENARIOS_DIR="$SCRIPT_DIR/scenarios"
SERVERS_DIR="$SCRIPT_DIR/servers"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

log() {
  echo "[$(date '+%H:%M:%S')] $*"
}

die() {
  echo "ERROR: $*" >&2
  exit 1
}

# Wait for the bench-server container to be healthy on :3000
wait_for_server() {
  local attempts=0
  local max=20
  while ! docker exec bench-server node -e "
    const http = require('http');
    http.get('http://localhost:3000/ping', (r) => {
      process.exit(r.statusCode === 200 ? 0 : 1);
    }).on('error', () => process.exit(1));
  " 2>/dev/null; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge "$max" ]; then
      die "Server did not become ready after $max attempts"
    fi
    sleep 0.5
  done
}

cleanup_server() {
  docker rm -f bench-server 2>/dev/null || true
}

# ---------------------------------------------------------------------------
# Pre-flight checks
# ---------------------------------------------------------------------------

command -v docker >/dev/null 2>&1 || die "docker not found in PATH"

# Create Docker network if it doesn't exist
if ! docker network inspect "$NETWORK" >/dev/null 2>&1; then
  log "Creating Docker network: $NETWORK"
  docker network create "$NETWORK"
fi

# Ensure results directory exists
mkdir -p "$RESULTS_DIR"

# ---------------------------------------------------------------------------
# Build all server images first (fail fast before running benchmarks)
# ---------------------------------------------------------------------------

log "=== Building server images ==="

for FRAMEWORK in $FRAMEWORKS; do
  BUILD_CONTEXT="$SERVERS_DIR/$FRAMEWORK"

  # ergo needs the local source packages baked in to the build context.
  if [ "$FRAMEWORK" = "ergo" ]; then
    ERGO_TMP="$SCRIPT_DIR/.ergo-build-ctx"
    rm -rf "$ERGO_TMP"
    mkdir -p "$ERGO_TMP"

    # Copy server files
    cp "$SERVERS_DIR/$FRAMEWORK/Dockerfile" "$ERGO_TMP/"
    cp "$SERVERS_DIR/$FRAMEWORK/package.json" "$ERGO_TMP/"
    cp "$SERVERS_DIR/$FRAMEWORK/server.js" "$ERGO_TMP/"

    # Copy local ergo source (one level up from benchmarks/)
    mkdir -p "$ERGO_TMP/packages"
    cp -r "$SCRIPT_DIR/../" "$ERGO_TMP/packages/ergo" --exclude=".git" --exclude="node_modules" --exclude="benchmarks" 2>/dev/null \
      || rsync -a --exclude=".git" --exclude="node_modules" --exclude="benchmarks" \
               "$SCRIPT_DIR/../" "$ERGO_TMP/packages/ergo/"

    # Also needs ergo-router
    ERGO_ROUTER_DIR="$(cd "$SCRIPT_DIR/../../ergo-router" 2>/dev/null && pwd)" || \
      die "ergo-router not found at ../../ergo-router. Expected sibling of the ergo repo."
    rsync -a --exclude=".git" --exclude="node_modules" \
             "$ERGO_ROUTER_DIR/" "$ERGO_TMP/packages/ergo-router/"

    # Strip lifecycle scripts (e.g. "prepare": "simple-git-hooks") that would
    # fail inside the Docker build where dev tooling is not installed.
    for PKG_JSON in "$ERGO_TMP"/packages/*/package.json; do
      node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('$PKG_JSON', 'utf8'));
        delete pkg.scripts;
        fs.writeFileSync('$PKG_JSON', JSON.stringify(pkg, null, 2) + '\n');
      "
    done

    BUILD_CONTEXT="$ERGO_TMP"
  fi

  log "Building bench-$FRAMEWORK ..."
  docker build -t "bench-$FRAMEWORK" "$BUILD_CONTEXT" --quiet
done

log "All images built."

# ---------------------------------------------------------------------------
# Capture installed dependency versions for reproducibility
# ---------------------------------------------------------------------------

log "=== Recording dependency versions ==="

for FRAMEWORK in $FRAMEWORKS; do
  VERSION_FILE="$RESULTS_DIR/${FRAMEWORK}--versions.json"
  docker run --rm "bench-$FRAMEWORK" npm ls --json --omit=dev 2>/dev/null > "$VERSION_FILE" || true
  log "  $FRAMEWORK -> $VERSION_FILE"
done

# ---------------------------------------------------------------------------
# Run benchmarks: framework × scenario × trial
# ---------------------------------------------------------------------------

TOTAL_RUNS=$(echo "$FRAMEWORKS" | wc -w)
TOTAL_RUNS=$((TOTAL_RUNS * $(echo "$SCENARIOS" | wc -w) * TRIALS))
CURRENT_RUN=0

log "=== Starting benchmark runs ($TOTAL_RUNS total) ==="

for FRAMEWORK in $FRAMEWORKS; do
  for SCENARIO in $SCENARIOS; do
    SCENARIO_FILE="$SCENARIOS_DIR/${SCENARIO}.js"
    if [ ! -f "$SCENARIO_FILE" ]; then
      log "WARNING: Scenario file not found: $SCENARIO_FILE -- skipping"
      continue
    fi

    for TRIAL in $(seq 1 "$TRIALS"); do
      CURRENT_RUN=$((CURRENT_RUN + 1))
      SUMMARY_FILE="$RESULTS_DIR/${FRAMEWORK}--${SCENARIO}--trial${TRIAL}-summary.json"

      log "[$CURRENT_RUN/$TOTAL_RUNS] $FRAMEWORK / $SCENARIO / trial $TRIAL"

      # Ensure no leftover server container
      cleanup_server

      # Start server container
      docker run -d \
        --name bench-server \
        --network "$NETWORK" \
        --cpuset-cpus="$SERVER_CPUS" \
        --memory="$SERVER_MEMORY" \
        --env NODE_ENV=production \
        "bench-$FRAMEWORK" >/dev/null

      # Wait for readiness
      sleep "$SERVER_READINESS_WAIT"
      wait_for_server

      # Collect Docker memory baseline (before load)
      MEM_BASELINE=$(docker stats bench-server --no-stream --format '{{.MemUsage}}' 2>/dev/null | awk '{print $1}' || echo "?")

      # Run k6 -- the script's handleSummary writes the summary JSON via the volume mount
      docker run --rm \
        --network "$NETWORK" \
        --cpuset-cpus="$K6_CPUS" \
        --memory="$K6_MEMORY" \
        -v "$SCENARIOS_DIR:/scenarios:ro" \
        -v "$RESULTS_DIR:/results" \
        -e "BASE_URL=http://bench-server:3000" \
        -e "FRAMEWORK=$FRAMEWORK" \
        -e "SCENARIO=$SCENARIO" \
        -e "TRIAL=$TRIAL" \
        "$K6_IMAGE" run \
          "/scenarios/${SCENARIO}.js" \
          2>&1 | grep -E "✓|✗|http_reqs|http_req_duration|ERRO|WARN|running|default" || true

      # Collect Docker memory peak (after load)
      MEM_PEAK=$(docker stats bench-server --no-stream --format '{{.MemUsage}}' 2>/dev/null | awk '{print $1}' || echo "?")

      # Append memory metadata to the summary file (as a second JSON object in file)
      if [ -f "$SUMMARY_FILE" ]; then
        # Read current summary, merge memory stats
        node -e "
          const fs = require('fs');
          const summary = JSON.parse(fs.readFileSync('$SUMMARY_FILE', 'utf8'));
          summary.memBaseline = '$MEM_BASELINE';
          summary.memPeak     = '$MEM_PEAK';
          fs.writeFileSync('$SUMMARY_FILE', JSON.stringify(summary));
        " 2>/dev/null || true
      fi

      cleanup_server
      log "  Done. Result: $SUMMARY_FILE"
    done
  done
done

# Cleanup build context
rm -rf "$SCRIPT_DIR/.ergo-build-ctx"

log "=== All runs complete ==="
log ""
log "Generate the report:"
log "  node report/generate.js"
log ""
log "Results written to: $RESULTS_DIR"
