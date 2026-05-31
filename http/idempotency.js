/**
 * @fileoverview Idempotency-Key pipeline middleware.
 *
 * Detects duplicate requests by `Idempotency-Key` header value per
 * draft-ietf-httpapi-idempotency-key-header-07. When a matching key with
 * the same request fingerprint is found, the stored response is replayed.
 * When a key matches but the fingerprint differs, a 409 Conflict is returned.
 *
 * Placed in Stage 3 (Validation) after body parsing so the request body
 * fingerprint can be computed from the parsed body.
 *
 * @module http/idempotency
 * @since 0.1.0-beta.2
 * @requires ../lib/idempotency.js
 *
 * @example
 * import {compose, body, idempotency} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   [body(), 'body'],
 *   [idempotency({required: true}), 'idempotency'],
 *   (req, res, acc) => ({response: {statusCode: 201, body: {created: true}}})
 * );
 *
 * @see {@link https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/ Idempotency-Key Header (IETF Draft)}
 */
import {IdempotencyStore, parseIdempotencyKey, generateFingerprint} from '../lib/idempotency.js';

const DEFAULT_METHODS = new Set(['POST', 'PATCH']);

/**
 * Create an idempotency middleware.
 *
 * @param {object} [options]
 * @param {object} [options.store] - Pluggable store (must implement get/set/complete/delete).
 *   Defaults to an in-memory store with 24h TTL.
 * @param {number} [options.ttlMs=86400000] - TTL for stored entries in milliseconds (default: 24h).
 *   Only used when creating the default in-memory store.
 * @param {boolean} [options.required=false] - When true, returns 400 if the header is missing
 *   on applicable methods
 * @param {Set<string>|string[]} [options.methods] - HTTP methods to apply idempotency to
 *   (default: POST, PATCH)
 */
export default function idempotency({store, ttlMs, required = false, methods} = {}) {
  const _store = store ?? new IdempotencyStore(ttlMs ? {ttlMs} : undefined);
  const _methods = methods instanceof Set ? methods : new Set(methods ?? DEFAULT_METHODS);

  return (req, _res, domainAcc) => {
    if (!_methods.has(req.method)) return {};

    const key = parseIdempotencyKey(req.headers?.['idempotency-key']);

    if (!key) {
      if (required) {
        return {
          response: {
            statusCode: 400,
            detail: 'Idempotency-Key header is required'
          }
        };
      }
      return {};
    }

    const rawBody = domainAcc?.body?.raw ?? domainAcc?.body?.parsed ?? '';
    const fingerprint = generateFingerprint(
      typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody)
    );

    const existing = _store.get(key);

    if (existing) {
      if (existing.fingerprint !== fingerprint) {
        return {
          response: {
            statusCode: 409,
            detail: 'Idempotency key already used with a different request'
          }
        };
      }

      if (existing.status === 'complete' && existing.response) {
        return {
          value: {replayed: true},
          response: existing.response
        };
      }

      // Still processing — concurrent duplicate
      return {
        response: {
          statusCode: 409,
          detail: 'A request with this idempotency key is already being processed'
        }
      };
    }

    _store.set(key, fingerprint);

    return {
      value: {
        key,
        fingerprint,
        complete: response => _store.complete(key, response),
        discard: () => _store.delete(key)
      }
    };
  };
}
