#!/usr/bin/env node

/**
 * Benchmark Report Generator
 *
 * Reads all *--trial*-summary.json files from the results directory, computes
 * per-scenario statistics (mean, stddev, CoV across trials), ranks frameworks,
 * and outputs a markdown report with noise analysis.
 */

import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = join(__dirname, 'results');

const FRAMEWORKS = ['node-http', 'express', 'fastify', 'hono', 'koa', 'ergo'];
const SCENARIO_LABELS = {
  '01-baseline-get': '01 Baseline GET',
  '02-param-get': '02 Param GET',
  '03-auth-get': '03 Auth GET',
  '04-json-post': '04 JSON POST',
  '05-full-pipeline': '05 Full Pipeline',
  '06-concurrency-ramp': '06 Concurrency Ramp',
  '07-production-stack': '07 Production Stack',
  '08-conditional-get': '08 Conditional GET (ETag)',
  '09-rate-limit-flood': '09 Rate-Limit Flood'
};

function loadResults() {
  const files = readdirSync(RESULTS_DIR).filter(
    f => f.endsWith('-summary.json') && f.includes('--trial')
  );
  const data = {};

  for (const file of files) {
    try {
      const raw = JSON.parse(readFileSync(join(RESULTS_DIR, file), 'utf8'));
      const key = `${raw.framework}::${raw.scenario}`;
      if (!data[key]) data[key] = [];
      data[key].push(raw);
    } catch {
      // skip malformed files
    }
  }
  return data;
}

function stats(values) {
  const n = values.length;
  if (n === 0) return {mean: 0, stddev: 0, cov: 0, min: 0, max: 0, n: 0};
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, v) => a + (v - mean) ** 2, 0) / n;
  const stddev = Math.sqrt(variance);
  return {
    mean,
    stddev,
    cov: mean > 0 ? (stddev / mean) * 100 : 0,
    min: Math.min(...values),
    max: Math.max(...values),
    n
  };
}

function fmt(n, decimals = 0) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function parseMem(s) {
  if (!s || s === '?') return null;
  const match = s.match(/([\d.]+)\s*(MiB|GiB|KiB)/);
  if (!match) return null;
  const val = parseFloat(match[1]);
  if (match[2] === 'GiB') return val * 1024;
  if (match[2] === 'KiB') return val / 1024;
  return val;
}

function generateReport(data) {
  const scenarios = Object.keys(SCENARIO_LABELS);
  const lines = [];

  lines.push('# Benchmark Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push(
    '**Setup:** Docker containers, CPU-pinned (core 0: server, core 1: k6), 512MB server memory, 3 trials per combination.'
  );
  lines.push('');

  // Per-scenario tables
  for (const scenario of scenarios) {
    const label = SCENARIO_LABELS[scenario];
    lines.push(`## ${label}`);
    lines.push('');
    lines.push(
      '| Framework | Avg RPS | StdDev | CoV% | p50 (ms) | p95 (ms) | p99 (ms) | Avg Latency (ms) | Mem Base | Mem Peak |'
    );
    lines.push(
      '|-----------|--------:|-------:|-----:|---------:|---------:|---------:|------------------:|---------:|---------:|'
    );

    const rows = [];
    for (const fw of FRAMEWORKS) {
      const key = `${fw}::${scenario}`;
      const trials = data[key];
      if (!trials || trials.length === 0) continue;

      const rpsValues = trials.map(t => t.metrics.http_reqs.values.rate);
      const p50Values = trials.map(t => t.metrics.http_req_duration.values['p(50)']);
      const p95Values = trials.map(t => t.metrics.http_req_duration.values['p(95)']);
      const p99Values = trials.map(t => t.metrics.http_req_duration.values['p(99)']);
      const avgLatValues = trials.map(t => t.metrics.http_req_duration.values.avg);
      const memBaseValues = trials.map(t => parseMem(t.memBaseline)).filter(v => v !== null);
      const memPeakValues = trials.map(t => parseMem(t.memPeak)).filter(v => v !== null);

      const rps = stats(rpsValues);
      const p50 = stats(p50Values);
      const p95 = stats(p95Values);
      const p99 = stats(p99Values);
      const avgLat = stats(avgLatValues);
      const memBase = stats(memBaseValues);
      const memPeak = stats(memPeakValues);

      rows.push({
        fw,
        rps,
        p50,
        p95,
        p99,
        avgLat,
        memBase,
        memPeak
      });
    }

    rows.sort((a, b) => b.rps.mean - a.rps.mean);

    for (const r of rows) {
      const marker = r.fw === 'ergo' ? '**' : '';
      lines.push(
        `| ${marker}${r.fw}${marker} | ${fmt(r.rps.mean)} | ${fmt(r.rps.stddev)} | ${r.rps.cov.toFixed(1)} | ${r.p50.mean.toFixed(2)} | ${r.p95.mean.toFixed(2)} | ${r.p99.mean.toFixed(2)} | ${r.avgLat.mean.toFixed(2)} | ${r.memBase.mean.toFixed(1)}MB | ${r.memPeak.mean.toFixed(1)}MB |`
      );
    }
    lines.push('');
  }

  // Ranking summary
  lines.push('## Overall Rankings (by avg RPS)');
  lines.push('');
  lines.push('| Scenario | 1st | 2nd | 3rd | 4th | 5th | 6th |');
  lines.push('|----------|-----|-----|-----|-----|-----|-----|');

  for (const scenario of scenarios) {
    const label = SCENARIO_LABELS[scenario].replace(/^\d+\s+/, '');
    const ranked = [];
    for (const fw of FRAMEWORKS) {
      const key = `${fw}::${scenario}`;
      const trials = data[key];
      if (!trials || trials.length === 0) continue;
      const rpsValues = trials.map(t => t.metrics.http_reqs.values.rate);
      ranked.push({fw, rps: stats(rpsValues).mean});
    }
    ranked.sort((a, b) => b.rps - a.rps);
    const cells = ranked.map(r => {
      const label = r.fw === 'ergo' ? `**${r.fw}**` : r.fw;
      return `${label} (${fmt(r.rps)})`;
    });
    while (cells.length < 6) cells.push('-');
    lines.push(`| ${label} | ${cells.join(' | ')} |`);
  }
  lines.push('');

  // Noise analysis
  lines.push('## Noise Analysis (Coefficient of Variation)');
  lines.push('');
  lines.push(
    'CoV measures run-to-run variability. **< 3%** is excellent, **3-5%** is acceptable, **5-10%** is noisy, **> 10%** is unreliable.'
  );
  lines.push('');
  lines.push('| Framework | Scenario | CoV (RPS) | CoV (p99) | Verdict |');
  lines.push('|-----------|----------|----------:|----------:|---------|');

  const noiseIssues = [];

  for (const scenario of scenarios) {
    for (const fw of FRAMEWORKS) {
      const key = `${fw}::${scenario}`;
      const trials = data[key];
      if (!trials || trials.length === 0) continue;

      const rpsValues = trials.map(t => t.metrics.http_reqs.values.rate);
      const p99Values = trials.map(t => t.metrics.http_req_duration.values['p(99)']);
      const rpsCov = stats(rpsValues).cov;
      const p99Cov = stats(p99Values).cov;
      const worstCov = Math.max(rpsCov, p99Cov);

      let verdict;
      if (worstCov < 3) verdict = 'Excellent';
      else if (worstCov < 5) verdict = 'Acceptable';
      else if (worstCov < 10) verdict = 'Noisy';
      else verdict = '**UNRELIABLE**';

      if (worstCov >= 5) {
        noiseIssues.push({fw, scenario: SCENARIO_LABELS[scenario], rpsCov, p99Cov, verdict});
        lines.push(
          `| ${fw} | ${SCENARIO_LABELS[scenario].replace(/^\d+\s+/, '')} | ${rpsCov.toFixed(1)}% | ${p99Cov.toFixed(1)}% | ${verdict} |`
        );
      }
    }
  }

  if (noiseIssues.length === 0) {
    lines.push('| (all) | (all) | < 5% | < 5% | All results stable |');
  }

  lines.push('');

  // Overall noise summary
  const allCovs = [];
  for (const scenario of scenarios) {
    for (const fw of FRAMEWORKS) {
      const key = `${fw}::${scenario}`;
      const trials = data[key];
      if (!trials || trials.length === 0) continue;
      const rpsValues = trials.map(t => t.metrics.http_reqs.values.rate);
      allCovs.push({fw, scenario, cov: stats(rpsValues).cov});
    }
  }

  const avgCov = allCovs.reduce((s, c) => s + c.cov, 0) / allCovs.length;
  const noisyCount = allCovs.filter(c => c.cov >= 5).length;
  const unreliableCount = allCovs.filter(c => c.cov >= 10).length;

  lines.push('### Summary');
  lines.push('');
  lines.push(`- **Average CoV across all combinations:** ${avgCov.toFixed(1)}%`);
  lines.push(`- **Noisy (CoV >= 5%):** ${noisyCount} / ${allCovs.length} combinations`);
  lines.push(`- **Unreliable (CoV >= 10%):** ${unreliableCount} / ${allCovs.length} combinations`);

  if (avgCov < 3) {
    lines.push('- **Overall verdict: CLEAN RUN** — results are highly reliable.');
  } else if (avgCov < 5) {
    lines.push(
      '- **Overall verdict: ACCEPTABLE** — minor noise but results are directionally reliable.'
    );
  } else if (avgCov < 10) {
    lines.push(
      '- **Overall verdict: NOISY** — consider re-running with fewer background processes.'
    );
  } else {
    lines.push(
      '- **Overall verdict: UNRELIABLE** — significant interference detected, re-run recommended.'
    );
  }

  lines.push('');

  // Ergo highlights
  lines.push('## Ergo Highlights');
  lines.push('');

  for (const scenario of scenarios) {
    const label = SCENARIO_LABELS[scenario].replace(/^\d+\s+/, '');
    const ranked = [];
    for (const fw of FRAMEWORKS) {
      const key = `${fw}::${scenario}`;
      const trials = data[key];
      if (!trials || trials.length === 0) continue;
      const rpsValues = trials.map(t => t.metrics.http_reqs.values.rate);
      ranked.push({fw, rps: stats(rpsValues).mean});
    }
    ranked.sort((a, b) => b.rps - a.rps);

    const ergoIdx = ranked.findIndex(r => r.fw === 'ergo');
    const ergoRps = ranked[ergoIdx]?.rps || 0;
    const nodeRps = ranked.find(r => r.fw === 'node-http')?.rps || 1;
    const fastifyRps = ranked.find(r => r.fw === 'fastify')?.rps || 1;

    const rank = ergoIdx + 1;
    const vsNode = ((ergoRps / nodeRps) * 100).toFixed(0);
    const vsFastify = ((ergoRps / fastifyRps) * 100).toFixed(0);

    lines.push(
      `- **${label}:** Rank #${rank} — ${fmt(ergoRps)} RPS (${vsNode}% of node:http, ${vsFastify}% of Fastify)`
    );
  }

  lines.push('');
  return lines.join('\n');
}

const data = loadResults();
const report = generateReport(data);
const outPath = join(RESULTS_DIR, 'report.md');
writeFileSync(outPath, report);
console.log(`Report written to ${outPath}`);
console.log('\n' + report);
