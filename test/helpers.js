/**
 * @fileoverview Shared test helpers for ergo unit and functional tests.
 *
 * Provides minimal req/res stubs for Layer 2 module tests and
 * a real HTTP server factory for Layer 3 contract tests.
 */
import http from 'node:http';
import {EventEmitter} from 'node:events';
import {fetch} from 'undici';

export {fetch};

/**
 * Create a minimal HTTP request-like object for module tests.
 * Only includes the surface used by ergo middleware.
 *
 * @param {object} [overrides] - Optional overrides for the mock request
 * @returns {object} - Mock HTTP request-like object
 */
export function createMockReq(overrides = {}) {
  const req = Object.assign(
    new EventEmitter(),
    {
      method: 'GET',
      url: '/',
      headers: {},
      socket: {encrypted: false, remoteAddress: '127.0.0.1'},
      destroy: () => {}
    },
    overrides
  );

  if (overrides.headers) {
    req.headers = Object.fromEntries(
      Object.entries(overrides.headers).map(([k, v]) => [k.toLowerCase(), v])
    );
  }

  return req;
}

/**
 * Create a minimal HTTP response-like object for module tests.
 * Tracks headers and captures the body passed to end().
 *
 * @param {object} [overrides] - Optional overrides for the mock response
 * @param {boolean} [overrides.asyncFinish=false] - When true, emit `finish` and invoke
 *   the `end` callback on a microtask (closer to real `ServerResponse` ordering)
 * @returns {object} - Mock HTTP response-like object
 */
export function createMockRes(overrides = {}) {
  const {asyncFinish = false, ...rest} = overrides;
  const headers = {};
  /** @type {{hasCallback: boolean}[]} */
  const endInvocations = [];
  const res = Object.assign(new EventEmitter(), {
    statusCode: 200,
    headersSent: false,
    writableEnded: false,
    writable: true,
    deliveringEndCallback: false,
    _headers: headers,
    _body: null,
    /** Record of underlying `end` calls (for asserting `origEnd(cb)` delivery). */
    endInvocations,
    setHeader(name, value) {
      headers[name.toLowerCase()] = value;
    },
    getHeader(name) {
      return headers[name.toLowerCase()];
    },
    removeHeader(name) {
      delete headers[name.toLowerCase()];
    },
    clearHeader(name) {
      delete headers[name.toLowerCase()];
    },
    getHeaders() {
      return {...headers};
    },
    write() {
      return true;
    },
    writeHead(statusCode, ...restArgs) {
      this.statusCode = statusCode;
      const hdrs =
        typeof restArgs[restArgs.length - 1] === 'object'
          ? restArgs[restArgs.length - 1]
          : undefined;
      if (hdrs) {
        for (const [k, v] of Object.entries(hdrs)) this.setHeader(k, v);
      }
      this.headersSent = true;
      return this;
    },
    end(chunk, encoding, cb) {
      // Node Writable.end overloads: end(cb) | end(chunk, cb) | end(chunk, encoding, cb)
      let endChunk = chunk;
      let endCb = cb;
      if (typeof endChunk === 'function') {
        endCb = endChunk;
        endChunk = undefined;
      } else if (typeof encoding === 'function') {
        endCb = encoding;
      }
      endInvocations.push({hasCallback: typeof endCb === 'function'});
      if (!this.headersSent) {
        this.writeHead(this.statusCode);
      }
      if (endChunk != null) {
        this._body = typeof endChunk === 'string' ? endChunk : Buffer.from(endChunk).toString();
      }
      // Match ServerResponse: writableEnded is true once end() is called; finish may be async.
      this.writableEnded = true;
      const complete = () => {
        this.emit('finish');
        if (typeof endCb === 'function') {
          // Data property (not a getter): Object.assign copies getter *values*, so a
          // getter would freeze as `false` at construction. Toggle on `this` instead.
          this.deliveringEndCallback = true;
          try {
            endCb();
          } finally {
            this.deliveringEndCallback = false;
          }
        }
      };
      if (asyncFinish) {
        queueMicrotask(complete);
      } else {
        complete();
      }
      return this;
    }
  });

  return Object.assign(res, rest);
}

/**
 * Start a real Node.js HTTP server and return baseUrl + close().
 * Listens on a random ephemeral port.
 *
 * @param {function} handler - Request handler `(req, res) => void`
 * @returns {Promise<{baseUrl: string, close: function}>} - Resolves with baseUrl and close function
 */
export function setupServer(handler) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handler);
    server.listen(0, '127.0.0.1', () => {
      const {port} = server.address();
      resolve({
        baseUrl: `http://127.0.0.1:${port}`,
        close: () => {
          server.closeAllConnections();
          return new Promise(res => server.close(res));
        }
      });
    });
    server.once('error', reject);
  });
}
