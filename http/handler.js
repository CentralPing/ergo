/**
 * @fileoverview HTTP request handler factory (v2 two-accumulator model).
 *
 * Creates a request handler suitable for `http.createServer()` that:
 * 1. Creates a fresh domain accumulator and response accumulator per request.
 * 2. Runs the composed pipeline with both accumulators.
 * 3. On unexpected errors, sets `responseAcc.statusCode = 500` (unless already set by
 *    timeout or an earlier pipeline break), populates `instance` from the request-id
 *    header, and emits the error on the response for any listeners.
 * 4. Calls `send()` exactly once with both accumulators.
 *
 * This is the standalone equivalent of ergo-router's `auto-wrap.js` — for users who
 * compose middleware directly without the router.
 *
 * @module http/handler
 * @version 0.2.0
 * @since 0.1.0
 *
 * @example
 * import {handler, compose, send, logger, authorization, body} from 'ergo';
 *
 * const pipeline = compose(
 *   [logger(), 'log'],
 *   [authorization({strategies}), 'auth'],
 *   [body(), 'body'],
 *   (req, res, acc) => ({response: {body: processRequest(acc), statusCode: 200}})
 * );
 *
 * const server = http.createServer(handler(pipeline));
 */
import {accumulator} from '../utils/compose.js';
import {createResponseAcc} from '../utils/compose-with.js';
import attachInstance from '../lib/attach-instance.js';
import createSend from './send.js';

/**
 * Creates the outermost request handler.
 *
 * @param {function} pipeline - Composed middleware pipeline
 * @param {object} [sendOptions] - Options forwarded to `send()`
 * @returns {function} - Async handler `(req, res) => void` for `http.createServer()`
 */
export default (pipeline, sendOptions = {}) => {
  const send = createSend(sendOptions);

  return async (req, res) => {
    const domainAcc = accumulator();
    const responseAcc = createResponseAcc();

    try {
      await pipeline(req, res, responseAcc, domainAcc);
    } catch (err) {
      if (responseAcc.statusCode === undefined) {
        responseAcc.statusCode = 500;
        responseAcc.detail = 'Internal Server Error';
      }

      attachInstance(responseAcc, res);

      if (res.listenerCount('error') > 0) {
        res.emit('error', err);
      }
    }

    try {
      send(req, res, responseAcc, domainAcc);
    } catch {
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.end();
      }
    }
  };
};
