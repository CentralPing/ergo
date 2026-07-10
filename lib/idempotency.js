/**
 * @fileoverview Idempotency-Key shared primitives.
 *
 * Provides the core building blocks for idempotent request handling per
 * draft-ietf-httpapi-idempotency-key-header-07. The `IdempotencyStore`
 * manages key lifecycle (storage, expiry, replay). `parseIdempotencyKey`
 * extracts the key value from the RFC 8941 structured field header.
 * `generateFingerprint` creates a SHA-256 hash of the request body for
 * detecting key reuse with different payloads.
 *
 * Used by:
 * - `http/idempotency.js` (ergo pipeline middleware)
 *
 * @module lib/idempotency
 * @since 0.1.0-beta.2
 *
 * @example
 * import {IdempotencyStore, parseIdempotencyKey, generateFingerprint}
 *   from '@centralping/ergo/lib/idempotency';
 *
 * const store = new IdempotencyStore();
 * const key = parseIdempotencyKey(req.headers['idempotency-key']);
 * const fingerprint = generateFingerprint(body);
 *
 * @see {@link https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/ Idempotency-Key Header (IETF Draft)}
 * @see {@link https://www.rfc-editor.org/rfc/rfc8941 RFC 8941 - Structured Field Values}
 */
import {createHash, randomUUID} from 'node:crypto';

export {
  parseIdempotencyKey,
  formatIdempotencyKey,
  assertSfStringInner
} from '@centralping/ergo-wire';

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const PROCESSING_EVICTED_CODE = 'ERGO_IDEMPOTENCY_PROCESSING_EVICTED';

/**
 * In-memory idempotency key store with TTL-based expiry.
 *
 * Entries transition through states: `processing` -> `complete`.
 * Expired entries are pruned lazily on `get()` calls and eagerly
 * in `set()` before capacity checks. Eviction prefers `complete`
 * entries over `processing` entries to protect in-flight requests.
 * Each `set()` returns a generation token that `complete()` validates
 * to prevent stale completions on recycled key slots.
 */
export class IdempotencyStore {
  /**
   * @param {object} [options]
   * @param {number} [options.maxKeys=10000] - Maximum number of stored keys before eviction
   * @param {number} [options.ttlMs=86400000] - Time-to-live for entries in milliseconds
   * @throws {TypeError} If `maxKeys` is not a positive integer
   * @throws {TypeError} If `ttlMs` is not a positive finite number
   */
  constructor({maxKeys = 10_000, ttlMs = DEFAULT_TTL_MS} = {}) {
    if (!Number.isInteger(maxKeys) || maxKeys < 1) {
      throw new TypeError('maxKeys must be a positive integer');
    }

    if (typeof ttlMs !== 'number' || !Number.isFinite(ttlMs) || ttlMs <= 0) {
      throw new TypeError('ttlMs must be a positive finite number');
    }

    this._entries = new Map();
    this._completeKeys = new Set();
    this._maxKeys = maxKeys;
    this._ttlMs = ttlMs;
    this._warnedProcessingEviction = false;
  }

  /**
   * Retrieve a stored entry by key. Returns a frozen deep-clone snapshot —
   * mutations (including nested objects) do not affect store state. Returns
   * `undefined` if not found or expired.
   * @param {string} key - Idempotency key
   * @returns {Readonly<{fingerprint: string, response: (object | undefined), status: string, expiresAt: number}> | undefined} - Frozen entry snapshot, or undefined
   */
  get(key) {
    const entry = this._entries.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this._entries.delete(key);
      this._completeKeys.delete(key);
      return undefined;
    }

    const snapshot = Object.create(null);
    snapshot.fingerprint = entry.fingerprint;
    snapshot.response = entry.response ? Object.freeze(structuredClone(entry.response)) : undefined;
    snapshot.status = entry.status;
    snapshot.expiresAt = entry.expiresAt;
    return Object.freeze(snapshot);
  }

  /**
   * Store a new idempotency entry in `processing` state.
   * @param {string} key - Idempotency key
   * @param {string} fingerprint - Request body fingerprint
   * @returns {string} - Generation token for validating `complete()` calls
   */
  set(key, fingerprint) {
    const now = Date.now();

    for (const [k, e] of this._entries) {
      if (now > e.expiresAt) {
        this._entries.delete(k);
        this._completeKeys.delete(k);
      } else {
        break;
      }
    }

    // Delete-before-insert: (a) prevents spurious eviction when re-setting an
    // existing key (Map.set on existing key doesn't grow size), and (b) ensures
    // the refreshed entry moves to end of iteration order, preserving the
    // ascending-expiresAt invariant the prune loop's early-break relies on.
    this._completeKeys.delete(key);
    this._entries.delete(key);

    if (this._entries.size >= this._maxKeys) {
      const candidate = this._completeKeys.values().next().value;

      if (candidate !== undefined) {
        this._completeKeys.delete(candidate);
        this._entries.delete(candidate);
      } else {
        const oldest = this._entries.keys().next().value;
        this._entries.delete(oldest);

        if (!this._warnedProcessingEviction) {
          this._warnedProcessingEviction = true;
          process.emitWarning(
            'IdempotencyStore evicted an in-flight processing entry to maintain ' +
              `maxKeys (${this._maxKeys}) capacity bound. The evicted request's ` +
              'complete() call will return false (generation mismatch).',
            {type: 'ErgoWarning', code: PROCESSING_EVICTED_CODE}
          );
        }
      }
    }

    const generation = randomUUID();
    const entry = Object.create(null);
    entry.fingerprint = fingerprint;
    entry.response = undefined;
    entry.status = 'processing';
    entry.expiresAt = now + this._ttlMs;
    entry.generation = generation;
    this._entries.set(key, entry);

    return generation;
  }

  /**
   * Mark an entry as complete with the response to replay. The response is
   * deep-cloned — the caller may safely mutate the original (including nested
   * objects) after calling `complete()`.
   * @param {string} key - Idempotency key
   * @param {object} response - Response accumulator snapshot to replay
   * @param {string} generation - Generation token from `set()` to validate slot identity
   * @returns {boolean} - `true` if updated, `false` if absent, evicted, or generation mismatch
   */
  complete(key, response, generation) {
    if (response == null) return false;

    const entry = this._entries.get(key);
    if (!entry) return false;
    if (entry.generation !== generation) return false;

    entry.status = 'complete';
    entry.response = structuredClone(response);
    this._completeKeys.add(key);
    return true;
  }

  /**
   * Remove an entry (e.g. on request failure where replay is not desired).
   * @param {string} key - Idempotency key
   */
  delete(key) {
    this._completeKeys.delete(key);
    this._entries.delete(key);
  }
}

/**
 * Generate a SHA-256 fingerprint of the request body.
 *
 * Used to detect key reuse with different payloads (which should return 409).
 * Accepts strings or Buffers. Returns the hex digest.
 *
 * @param {string|import('node:buffer').Buffer} body - Serialized request body
 * @returns {string} - Hex-encoded SHA-256 hash
 */
export function generateFingerprint(body) {
  return createHash('sha256')
    .update(body ?? '')
    .digest('hex');
}
