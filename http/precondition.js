/**
 * @fileoverview Precondition Required middleware (RFC 6585 §3).
 *
 * Enforces that unsafe requests include a conditional header (`If-Match` or
 * `If-Unmodified-Since`) before the pipeline proceeds. This prevents "lost update"
 * problems where a client overwrites changes made by another client without first
 * fetching the current resource state.
 *
 * Placed in Stage 1 (Negotiation) for Fast Fail — the check is a cheap header
 * inspection that short-circuits before authorization, body parsing, or execution.
 *
 * @module http/precondition
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, precondition, send} from 'ergo';
 *
 * // Enforce on all requests (method scoping handled by pipeline builder)
 * const pipeline = compose(
 *   [precondition(), [], 'precondition'],
 *   (req, res, acc) => ({statusCode: 200, body: {updated: true}}),
 *   send()
 * );
 *
 * // Enforce only on specific methods (standalone usage)
 * const pipeline = compose(
 *   [precondition({methods: ['PUT', 'PATCH']}), [], 'precondition'],
 *   (req, res, acc) => ({statusCode: 200, body: {updated: true}}),
 *   send()
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6585#section-3 RFC 6585 Section 3 - 428 Precondition Required}
 */

/**
 * Create a precondition enforcement middleware.
 *
 * @param {object} [options]
 * @param {string[]|Set<string>} [options.methods] - HTTP methods to enforce on.
 *   When omitted, enforces unconditionally (the pipeline builder handles method scoping).
 *   When provided, only activates for the specified methods.
 * @returns {function} - Middleware `(req) => void` that throws 428 if no conditional header is present
 */
export default function precondition({methods} = {}) {
  const methodSet = methods ? (methods instanceof Set ? methods : new Set(methods)) : undefined;

  return req => {
    if (methodSet && !methodSet.has(req.method)) return;

    if (!req.headers['if-match'] && !req.headers['if-unmodified-since']) {
      return {response: {statusCode: 428}};
    }
  };
}
