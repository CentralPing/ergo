/**
 * @fileoverview HTTP middleware factory for response serialization.
 *
 * Reads the accumulator's `statusCode`, `body`, and `headers` properties and writes the
 * HTTP response. Handles multiple body types:
 * - `null`/`undefined` — no body (enforced for 204/304)
 * - `string` — written as-is; detects HTML vs plain text content type
 * - `Uint8Array` (non-Buffer) — written as `application/octet-stream`
 * - `Stream` (readable) — piped to the response
 * - `Object` — JSON-serialized; respects `prettify` option
 *
 * Also handles:
 * - ETag generation and conditional request evaluation (`If-None-Match`, `If-Match`)
 * - `Last-Modified` and date-based conditionals (`If-Modified-Since`, `If-Unmodified-Since`)
 * - `Location` header for 201 Created and 3xx redirect responses
 * - `Vary: Accept-Encoding` header injection
 * - Explicit `Content-Length` header
 * - Status code lookup via `http.STATUS_CODES`
 *
 * @module http/send
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:stream
 * @requires node:http
 * @requires etag
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, handler, send} from 'ergo';
 *
 * // Basic usage -- send() is called automatically in ergo-router
 * const pipeline = compose(
 *   (req, res, acc) => ({statusCode: 200, body: {hello: 'world'}}),
 *   send()
 * );
 *
 * // Explicit ETag usage
 * const pipeline = compose(
 *   (req, res, acc) => ({statusCode: 200, body: data, headers: [['Cache-Control', 'max-age=60']]}),
 *   send({etag: true, prettify: false})
 * );
 *
 * // Auto-collect middleware headers via headerKeys
 * const pipeline = compose(
 *   [cors({origins: ['https://app.example.com']}), [], 'cors'],
 *   [securityHeaders(), [], 'security'],
 *   [cacheControl({public: true, maxAge: 3600}), [], 'cache'],
 *   (req, res, acc) => ({statusCode: 200, body: data}),
 *   send({headerKeys: ['cors', 'security', 'cache']})
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110 RFC 9110 - HTTP Semantics}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9457 RFC 9457 - Problem Details for HTTP APIs}
 */
import {Stream, pipeline} from 'node:stream';
import {STATUS_CODES} from 'node:http';
import generateETag from 'etag';
import httpErrors from '../utils/http-errors.js';
import appendVary from '../lib/vary.js';

const isHTML = /<[a-z][^>]*>/i;

const NO_BODY_STATUSES = new Set([204, 304]);
const ETAG_UNSAFE_METHODS = new Set(['PUT', 'PATCH', 'DELETE']);

/**
 * Built-in response envelope format.
 * @param {object} body - Original response body
 * @param {{requestId: string, statusCode: number}} ctx - Request context
 * @returns {object} - Enveloped body
 */
function defaultEnvelope(body, {requestId, statusCode}) {
  const result = {id: requestId, status: statusCode, data: body};
  if (Array.isArray(body)) result.count = body.length;
  return result;
}

/**
 * Inline body type detection -- avoids the per-request constructor.name
 * lookup from utils/type.js.
 * @param {*} body - Response body value to classify
 * @returns {string} - Type label: 'Null', 'String', 'Uint8Array', 'Stream', or 'Object'
 */
function bodyType(body) {
  if (body === null || body === undefined) {
    return 'Null';
  }
  if (typeof body === 'string') {
    return 'String';
  }
  // Uint8Array but not Buffer — Buffer extends Uint8Array but should be
  // treated as a generic object (JSON-stringified) to match existing behavior.
  if (body instanceof Uint8Array && !Buffer.isBuffer(body)) {
    return 'Uint8Array';
  }
  if (body instanceof Stream) {
    return 'Stream';
  }
  return 'Object';
}

/**
 * Creates a response serialization middleware that writes the accumulated result
 * to the HTTP response, handling content type, ETag, and conditional requests.
 *
 * @param {object} [options] - Send configuration
 * @param {boolean} [options.prettify=false] - Pretty-print JSON output
 * @param {string[]} [options.vary=['Accept']] - Vary header values to append
 * @param {boolean} [options.etag=true] - Generate and evaluate ETags for conditional responses
 * @param {string[]} [options.headerKeys=[]] - Accumulator keys whose values are header tuple
 *   arrays (`Array<[string, string]>`). Tuples from these keys are prepended to the explicit
 *   `headers` array so middleware-produced headers are sent automatically without manual spreading.
 *   Explicit `headers` take precedence (applied last).
 * @param {string} [options.preferKey] - Accumulator key holding parsed Prefer header preferences.
 *   When set and `return=minimal` is requested, 200 responses become 204 and 201 responses have
 *   their body stripped. `Preference-Applied` is set accordingly. Adds `Prefer` to the Vary header.
 * @param {boolean|function} [options.envelope=false] - Wrap 2xx Object bodies in a response envelope.
 *   `false` (default) — no envelope. `true` — built-in format `{id, status, data, count?}`.
 *   `function(body, ctx)` — custom envelope; `ctx` is `{requestId, statusCode, method}`.
 *   Only applied to 2xx responses with Object bodies (not errors, streams, strings, or binary).
 * @returns {function} - Middleware `(req, res, acc) => void` that ends the response
 */
export default ({
  prettify = false,
  vary = ['Accept'],
  etag = true,
  headerKeys = [],
  preferKey,
  envelope = false
} = {}) => {
  const effectiveVary = preferKey ? [...(vary || []), 'Prefer'] : vary;
  // Pre-compute the Vary header value at creation time (static for the
  // lifetime of this middleware instance) to avoid per-request string work.
  const varyValue = effectiveVary?.length ? effectiveVary.join(', ') : undefined;

  return (req, res, ...rest) => {
    if (res.writableEnded || !res.writable) {
      return;
    }

    const acc = rest.pop();
    let {
      statusCode = res.statusCode,
      body = STATUS_CODES[statusCode] ?? String(statusCode),
      type: explicitType,
      headers = [],
      cookies,
      lastModified,
      location
    } = acc;

    for (const key of headerKeys) {
      const tuples = acc[key];
      if (Array.isArray(tuples)) {
        headers = [...tuples, ...headers];
      }
    }

    if (
      envelope &&
      statusCode >= 200 &&
      statusCode < 300 &&
      bodyType(body) === 'Object' &&
      !(body instanceof Error)
    ) {
      const requestId = res.getHeader('x-request-id');
      body =
        typeof envelope === 'function'
          ? envelope(body, {requestId, statusCode, method: req.method})
          : defaultEnvelope(body, {requestId, statusCode});
    }

    const resolvedType = explicitType ?? bodyType(body);

    res.statusCode = statusCode;

    if (cookies) {
      res.setHeader('Set-Cookie', cookies.toHeader());
    }

    for (const [header, value] of headers) {
      if (header !== undefined) {
        if (value === undefined) {
          res.clearHeader(header);
        } else {
          res.setHeader(header, value);
        }
      }
    }

    if (varyValue) {
      appendVary(res, varyValue);
    }

    // RFC 9110 §10.2.2: Location header for 201 Created and 3xx redirects
    if (location && statusCode >= 200 && statusCode < 400) {
      res.setHeader('Location', location);
    }

    // RFC 7240: Prefer header — return=minimal strips body, return=representation confirms
    if (preferKey) {
      const prefer = acc[preferKey];
      if (prefer?.return === 'minimal' && statusCode >= 200 && statusCode < 300) {
        res.setHeader('Preference-Applied', 'return=minimal');
        if (statusCode === 200) res.statusCode = 204;
        endNoBody(res);
        return;
      }
      if (prefer?.return === 'representation' && statusCode >= 200 && statusCode < 300) {
        res.setHeader('Preference-Applied', 'return=representation');
      }
    }

    // RFC 7231: 204 No Content and 304 Not Modified MUST NOT contain a body
    if (NO_BODY_STATUSES.has(statusCode)) {
      endNoBody(res);
      return;
    }

    if (res.getHeader('Content-Type') === undefined) {
      if (resolvedType === 'Stream') {
        res.setHeader('Content-Type', 'application/octet-stream');
        pipeline(body, res, err => {
          if (err && res.listenerCount('error') > 0) {
            res.emit('error', err);
          }
        });
        return;
      }

      switch (resolvedType) {
        case 'String':
          res.setHeader(
            'Content-Type',
            isHTML.test(body) ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8'
          );
          break;
        case 'Uint8Array':
          res.setHeader('Content-Type', 'application/octet-stream');
          break;
        default:
          // RFC 9457: Error bodies use application/problem+json
          res.setHeader(
            'Content-Type',
            body instanceof Error
              ? 'application/problem+json; charset=utf-8'
              : 'application/json; charset=utf-8'
          );
          break;
      }
    }

    const contentType = res.getHeader('Content-Type');
    if (contentType.includes('/json') || contentType.includes('+json')) {
      body = JSON.stringify(body, null, prettify ? 2 : 0);
    }

    const len = typeof body === 'string' ? Buffer.byteLength(body) : body.length;

    if (len !== undefined) {
      res.setHeader('Content-Length', len);
    }

    // Last-Modified header (set before conditionals so it's present in 304/412 responses)
    let lastModifiedDate;
    if (lastModified != null && statusCode >= 200 && statusCode < 300) {
      lastModifiedDate = lastModified instanceof Date ? lastModified : new Date(lastModified);
      if (!Number.isNaN(lastModifiedDate.getTime())) {
        res.setHeader('Last-Modified', lastModifiedDate.toUTCString());
      } else {
        lastModifiedDate = undefined;
      }
    }

    const ifNoneMatch = req.headers?.['if-none-match'];
    const ifMatch = req.headers?.['if-match'];

    // ETag: conditional responses
    if (etag && statusCode >= 200 && statusCode < 300) {
      const entityBody =
        typeof body === 'string' ? body : Buffer.isBuffer(body) ? body : Buffer.from(String(body));
      const tag = generateETag(entityBody);
      res.setHeader('ETag', tag);

      // If-None-Match -> 304 (weak comparison per RFC 9110 §8.8.3.2)
      if (ifNoneMatch && weakMatchesETag(ifNoneMatch, tag)) {
        res.statusCode = 304;
        endNoBody(res);
        return;
      }

      // If-Match -> 412 (strong comparison per RFC 9110 §8.8.3.2)
      if (ifMatch && ETAG_UNSAFE_METHODS.has(req.method)) {
        if (!strongMatchesETag(ifMatch, tag)) {
          endWithProblem(res, 412);
          return;
        }
      }
    }

    // Date-based conditional responses (RFC 9110 §8.8.2)
    if (lastModifiedDate && statusCode >= 200 && statusCode < 300) {
      // If-Modified-Since → 304 (skip when If-None-Match is present per RFC 9110 §13.1.3)
      if (!ifNoneMatch) {
        const ifModifiedSince = req.headers?.['if-modified-since'];
        if (ifModifiedSince && !isModifiedSince(lastModifiedDate, ifModifiedSince)) {
          res.statusCode = 304;
          endNoBody(res);
          return;
        }
      }

      // If-Unmodified-Since → 412 (skip when If-Match is present per RFC 9110 §13.1.4)
      if (!ifMatch && ETAG_UNSAFE_METHODS.has(req.method)) {
        const ifUnmodifiedSince = req.headers?.['if-unmodified-since'];
        if (ifUnmodifiedSince && isModifiedSince(lastModifiedDate, ifUnmodifiedSince)) {
          endWithProblem(res, 412);
          return;
        }
      }
    }

    res.end(body);
  };
};

/**
 * Weak comparison: two ETags match if their opaque-tags are identical after
 * stripping any `W/` prefix (RFC 9110 §8.8.3.2).
 * Used for `If-None-Match`.
 * @param {string} header - The header value (e.g., '"abc", W/"def"')
 * @param {string} tag - The generated ETag
 * @returns {boolean} - True if any ETag in the header weakly matches the tag
 */
function weakMatchesETag(header, tag) {
  if (header === '*') {
    return true;
  }
  const normalized = tag.replace(/^W\//, '');
  return header.split(',').some(t => t.trim().replace(/^W\//, '') === normalized);
}

/**
 * Strong comparison: two ETags match only if both are strong (no `W/` prefix)
 * and their opaque-tags are identical (RFC 9110 §8.8.3.2).
 * Used for `If-Match`.
 * @param {string} header - The header value (e.g., '"abc", "def"')
 * @param {string} tag - The generated ETag
 * @returns {boolean} - True if any strong ETag in the header matches the tag
 */
function strongMatchesETag(header, tag) {
  if (header === '*') {
    return true;
  }
  if (tag.startsWith('W/')) {
    return false;
  }
  return header.split(',').some(t => {
    const trimmed = t.trim();
    return !trimmed.startsWith('W/') && trimmed === tag;
  });
}

/**
 * Determines whether a resource has been modified after the given date.
 * Compares at second resolution since HTTP dates have second precision.
 * @param {Date} lastModified - The resource's last modification date
 * @param {string} headerValue - The If-Modified-Since or If-Unmodified-Since header value
 * @returns {boolean} - True if the resource was modified after the header date
 */
function isModifiedSince(lastModified, headerValue) {
  const since = new Date(headerValue);
  if (Number.isNaN(since.getTime())) return true;
  return Math.floor(lastModified.getTime() / 1000) > Math.floor(since.getTime() / 1000);
}

/**
 * End the response with no body for 304 Not Modified (or 204 No Content).
 * Strips body-related headers per RFC 7231.
 * @param {import('node:http').ServerResponse} res - HTTP response object
 */
function endNoBody(res) {
  res.removeHeader('Content-Type');
  res.removeHeader('Content-Length');
  res.removeHeader('Transfer-Encoding');
  res.end();
}

/**
 * End the response with an RFC 9457 Problem Details body for conditional
 * request failures (412 Precondition Failed).
 * @param {import('node:http').ServerResponse} res - HTTP response object
 * @param {number} statusCode - HTTP status code for the error
 */
function endWithProblem(res, statusCode) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/problem+json; charset=utf-8');
  const body = JSON.stringify(httpErrors(statusCode));
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}
