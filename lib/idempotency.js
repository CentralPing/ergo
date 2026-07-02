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
import {createHash} from 'node:crypto';

// RFC 8941 §3.3.3: chr = unescaped / escaped
// unescaped = %x20-21 / %x23-5B / %x5D-7E
// escaped   = "\" ( DQUOTE / "\" )
const SF_STRING_RE = /^"((?:[\x20-\x21\x23-\x5B\x5D-\x7E]|\\["\\])*)"$/;
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * In-memory idempotency key store with TTL-based expiry.
 *
 * Entries transition through states: `processing` -> `complete`.
 * Expired entries are pruned lazily on `get()` calls.
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
    this._maxKeys = maxKeys;
    this._ttlMs = ttlMs;
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
   */
  set(key, fingerprint) {
    if (this._entries.size >= this._maxKeys) {
      const oldest = this._entries.keys().next().value;
      this._entries.delete(oldest);
    }

    const entry = Object.create(null);
    entry.fingerprint = fingerprint;
    entry.response = undefined;
    entry.status = 'processing';
    entry.expiresAt = Date.now() + this._ttlMs;
    this._entries.set(key, entry);
  }

  /**
   * Mark an entry as complete with the response to replay. The response is
   * deep-cloned — the caller may safely mutate the original (including nested
   * objects) after calling `complete()`.
   * @param {string} key - Idempotency key
   * @param {object} response - Response accumulator snapshot to replay
   * @throws {TypeError} If `response` is not an object
   */
  complete(key, response) {
    const entry = this._entries.get(key);
    if (entry) {
      if (response == null || typeof response !== 'object') {
        throw new TypeError('response must be an object');
      }
      const clonedResponse = structuredClone(response);
      entry.status = 'complete';
      entry.response = clonedResponse;
    }
  }

  /**
   * Remove an entry (e.g. on request failure where replay is not desired).
   * @param {string} key - Idempotency key
   */
  delete(key) {
    this._entries.delete(key);
  }
}

/**
 * Parse an `Idempotency-Key` header value as an RFC 8941 sf-string.
 *
 * The draft specifies the header is an Item Structured Header whose value
 * is a String. This means the wire format is `"value"` (double-quoted).
 * Returns `undefined` for missing, empty, or malformed values.
 *
 * @param {string | undefined} header - Raw header value
 * @returns {string | undefined} - Parsed key value, or undefined
 */
export function parseIdempotencyKey(header) {
  if (!header) return undefined;

  const trimmed = header.trim();
  const match = SF_STRING_RE.exec(trimmed);
  if (!match) return undefined;

  const inner = match[1];
  return inner.replace(/\\(["\\])/g, '$1');
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
