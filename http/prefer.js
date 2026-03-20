/**
 * @fileoverview HTTP middleware factory for Prefer header parsing (RFC 7240).
 *
 * Parses the `Prefer` request header and returns a preferences object for the
 * accumulator. Combined with `send()`'s `preferKey` option, enables automatic
 * `return=minimal` / `return=representation` response handling.
 *
 * Placed in Stage 1 (Negotiation) — cheap header parse with no I/O.
 *
 * @module http/prefer
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/prefer.js
 *
 * @example
 * import {compose, prefer, send} from 'ergo';
 *
 * const pipeline = compose(
 *   [prefer(), [], 'prefer'],
 *   (req, res, acc) => ({statusCode: 200, body: {id: 1, name: 'item'}}),
 *   send({preferKey: 'prefer'})
 * );
 * // Client sends: Prefer: return=minimal
 * // Response: 204 No Content + Preference-Applied: return=minimal
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7240 RFC 7240 - Prefer Header for HTTP}
 */
import parsePrefer from '../lib/prefer.js';

/**
 * Creates a Prefer header parsing middleware.
 *
 * @returns {function} - Middleware `(req) => object` returning parsed preferences
 */
export default () => {
  return req => parsePrefer(req.headers?.prefer);
};
