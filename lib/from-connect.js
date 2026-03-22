/**
 * @fileoverview Adapter for Connect/Express-style middleware.
 *
 * Wraps a Connect-style `(req, res, next)` middleware into ergo's
 * `(req, res) => Promise<undefined>` signature so it can be used inside
 * ergo's `compose()` pipeline.
 *
 * The adapter handles two completion signals:
 * - `next()` called — the standard path; promise resolves and the pipeline continues.
 * - `res` `finish` event — fallback for middleware that ends the response directly
 *   (e.g., CORS preflight, rate limiter sending 429) without calling `next()`.
 *
 * A `settled` guard prevents double-resolution from buggy middleware that calls
 * `next()` multiple times or calls `next()` after ending the response.
 *
 * Returns `undefined` so neither the domain nor response accumulator is affected.
 * Connect middleware communicates via side effects on `res` headers.
 *
 * Limitations:
 * - Express error-handling middleware `(err, req, res, next)` is not supported.
 *   Ergo handles errors via `handler()` / `attempt()` try/catch.
 * - Connect middleware may mutate `req` (e.g., `req.user`). This violates ergo's
 *   no-mutation convention but is accepted at the interop boundary.
 *
 * @module lib/from-connect
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import {compose, handler} from 'ergo';
 * import fromConnect from 'ergo/lib/from-connect';
 * import helmet from 'helmet';
 *
 * const pipeline = compose(
 *   fromConnect(helmet()),
 *   () => ({response: {body: {ok: true}}})
 * );
 *
 * export default handler(pipeline);
 */

/**
 * Wrap a Connect/Express-style middleware for use in an ergo pipeline.
 *
 * @param {function} middleware - Connect middleware `(req, res, next) => void`
 * @returns {function} - Ergo-compatible middleware `(req, res) => Promise<undefined>`
 */
export default function fromConnect(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      let settled = false;

      const onFinish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      res.once('finish', onFinish);

      middleware(req, res, err => {
        if (settled) return;
        settled = true;
        res.removeListener('finish', onFinish);
        if (err) return reject(err);
        resolve();
      });
    });
}
