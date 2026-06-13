/**
 * @fileoverview Fast Fail REST API toolkit for Node.js.
 *
 * Composable middleware organized into four ordered pipeline stages — a failure
 * at any stage immediately returns a standards-compliant error response so no
 * downstream work is wasted:
 *
 * | Stage | Middleware | Purpose |
 * | --- | --- | --- |
 * | **Negotiation** | {@link logger}, {@link cors}, {@link accepts}, {@link cookie}, {@link url} | Parse/inspect request headers and URL |
 * | **Authorization** | {@link authorization}, {@link csrf} | Authenticate and verify request integrity |
 * | **Validation** | {@link body}, {@link jsonApiQuery}, {@link validate} | Parse and validate the request body |
 * | **Execution** | {@link timeout}, {@link compress}, {@link handler}, {@link send} | Run the handler and serialize the response |
 *
 * Cross-cutting middleware available at any stage:
 * {@link cacheControl}, {@link prefer}, {@link precondition},
 * {@link rateLimit}, {@link securityHeaders}
 *
 * **Composition utilities:** {@link compose}, {@link createResponseAcc},
 * {@link mergeResponse}, {@link httpErrors}, {@link fromConnect},
 * {@link paginate}
 *
 * @module @centralping/ergo
 * @since 0.1.0
 * @requires ./main.js
 *
 * @example
 * import http from 'node:http';
 * import {compose, handler, logger, cors, accepts, authorization,
 *         body, send} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   {fn: logger(), setPath: 'log'},
 *   cors(),
 *   {fn: accepts({types: ['application/json']}), setPath: 'accepts'},
 *   {fn: authorization({strategies: [...]}), setPath: 'auth'},
 *   {fn: body(), setPath: 'body'},
 *   (req, res, acc) => ({response: {body: acc.body.parsed}}),
 * );
 *
 * const server = http.createServer(handler(pipeline));
 *
 * @see {@link https://centralping.github.io/concepts/fast-fail/ Fast Fail Pipeline}
 * @see {@link https://centralping.github.io/concepts/security/ Security}
 * @see {@link https://centralping.github.io/concepts/standards/ Standards Compliance}
 */

export * from './main.js';
