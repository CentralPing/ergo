/**
 * @fileoverview HTTP response serialization (v2: two-accumulator model).
 *
 * Called directly by auto-wrap / handler after the pipeline completes.
 * Reads from two accumulators:
 * - **responseAcc**: `statusCode`, `body`, `headers`, `detail`, `retryAfter`,
 *   `instance`, `location`, `lastModified`, `type` (explicit body type override)
 * - **domainAcc**: `cookies` (cookie jar), `prefer` (parsed Prefer header)
 *
 * For error responses (`statusCode >= 400`), builds an RFC 9457 Problem Details
 * body automatically from `statusCode`, `detail`, `retryAfter`, `instance`, and
 * any extension members on the response accumulator.
 *
 * For success responses (`statusCode < 400`), handles multiple body types:
 * - `null`/`undefined` — default text from STATUS_CODES (enforced empty for 204/304)
 * - `string` — written as-is; detects HTML vs plain text content type
 * - `Uint8Array` (non-Buffer) — written as `application/octet-stream`
 * - `Stream` (readable) — piped to the response
 * - `Object` — JSON-serialized; respects `prettify` option
 *
 * Also handles:
 * - ETag generation and conditional request evaluation (`If-None-Match`, `If-Match`)
 * - `Last-Modified` and date-based conditionals (`If-Modified-Since`, `If-Unmodified-Since`)
 * - `Location` header for 201 Created and 3xx redirect responses
 * - `Vary` header injection
 * - `Retry-After` header from `retryAfter` on the response accumulator
 * - `Set-Cookie` from `domainAcc.cookies.toHeader()`
 * - RFC 7240 Prefer handling (`return=minimal`, `return=representation`)
 * - Optional response envelope for 2xx Object bodies
 *
 * @module http/send
 * @version 0.2.0
 * @since 0.1.0
 * @requires node:stream
 * @requires node:http
 * @requires etag
 * @requires ../utils/http-errors.js
 * @requires ../lib/vary.js
 *
 * @example
 * import {send, createResponseAcc} from 'ergo';
 *
 * const writer = send({etag: true});
 * // After pipeline completes:
 * writer(req, res, responseAcc, domainAcc);
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

const SEND_RESERVED = new Set([
  'statusCode',
  'body',
  'headers',
  'detail',
  'retryAfter',
  'instance',
  'type',
  'lastModified',
  'location'
]);

/**
 * Built-in response envelope format.
 *
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
 * Inline body type detection.
 *
 * @param {*} body - Response body value to classify
 * @returns {string} - Type label: 'Null', 'String', 'Uint8Array', 'Stream', or 'Object'
 */
function bodyType(body) {
  if (body === null || body === undefined) return 'Null';
  if (typeof body === 'string') return 'String';
  if (body instanceof Uint8Array && !Buffer.isBuffer(body)) return 'Uint8Array';
  if (body instanceof Stream) return 'Stream';
  return 'Object';
}

/**
 * Creates a response serialization function.
 *
 * @param {object} [options] - Send configuration
 * @param {boolean} [options.prettify=false] - Pretty-print JSON output
 * @param {string[]} [options.vary=['Accept']] - Vary header values to append
 * @param {boolean} [options.etag=true] - Generate and evaluate ETags for conditional responses
 * @param {boolean} [options.prefer=false] - When true, read `domainAcc.prefer` for RFC 7240
 *   handling. Adds `Prefer` to the Vary header.
 * @param {boolean|function} [options.envelope=false] - Wrap 2xx Object bodies in a response
 *   envelope. `false` (default) — no envelope. `true` — built-in format `{id, status, data,
 *   count?}`. `function(body, ctx)` — custom envelope.
 * @returns {function} - `(req, res, responseAcc, domainAcc) => void`
 */
export default ({
  prettify = false,
  vary = ['Accept'],
  etag = true,
  prefer = false,
  envelope = false
} = {}) => {
  const effectiveVary = prefer ? [...(vary || []), 'Prefer'] : vary;
  const varyValue = effectiveVary?.length ? effectiveVary.join(', ') : undefined;

  return (req, res, responseAcc, domainAcc = {}) => {
    if (res.writableEnded || !res.writable) return;

    let {
      statusCode = res.statusCode,
      body,
      type: explicitType,
      headers = [],
      lastModified,
      location,
      detail,
      retryAfter,
      instance
    } = responseAcc;

    // RFC 9457: build error body for 4xx/5xx
    if (statusCode >= 400) {
      const opts = {};
      if (detail) opts.message = detail;
      if (retryAfter != null) opts.retryAfter = retryAfter;
      if (instance) opts.instance = instance;

      for (const key of Object.keys(responseAcc)) {
        if (!SEND_RESERVED.has(key) && opts[key] === undefined) {
          opts[key] = responseAcc[key];
        }
      }

      body = httpErrors(statusCode, opts);
    } else if (body === undefined) {
      body = STATUS_CODES[statusCode] ?? String(statusCode);
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

    // Middleware-contributed headers (from responseAcc.headers)
    for (const [header, value] of headers) {
      if (header !== undefined) {
        if (value === undefined) {
          res.clearHeader(header);
        } else {
          res.setHeader(header, value);
        }
      }
    }

    // Cookies from domain accumulator
    if (domainAcc.cookies) {
      res.setHeader('Set-Cookie', domainAcc.cookies.toHeader());
    }

    if (retryAfter != null) {
      res.setHeader('Retry-After', String(retryAfter));
    }

    if (varyValue) {
      appendVary(res, varyValue);
    }

    // RFC 9110 §10.2.2: Location header for 201 Created and 3xx redirects
    if (location && statusCode >= 200 && statusCode < 400) {
      res.setHeader('Location', location);
    }

    // RFC 7240: Prefer header handling
    if (prefer) {
      const preferData = domainAcc.prefer;
      if (preferData?.return === 'minimal' && statusCode >= 200 && statusCode < 300) {
        res.setHeader('Preference-Applied', 'return=minimal');
        if (statusCode === 200) res.statusCode = 204;
        endNoBody(res);
        return;
      }
      if (preferData?.return === 'representation' && statusCode >= 200 && statusCode < 300) {
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
 *
 * @param {string} header - The header value (e.g., '"abc", W/"def"')
 * @param {string} tag - The generated ETag
 * @returns {boolean} - True if any ETag in the header weakly matches the tag
 */
function weakMatchesETag(header, tag) {
  if (header === '*') return true;
  const normalized = tag.replace(/^W\//, '');
  return header.split(',').some(t => t.trim().replace(/^W\//, '') === normalized);
}

/**
 * Strong comparison: two ETags match only if both are strong (no `W/` prefix)
 * and their opaque-tags are identical (RFC 9110 §8.8.3.2).
 *
 * @param {string} header - The header value (e.g., '"abc", "def"')
 * @param {string} tag - The generated ETag
 * @returns {boolean} - True if any strong ETag in the header matches the tag
 */
function strongMatchesETag(header, tag) {
  if (header === '*') return true;
  if (tag.startsWith('W/')) return false;
  return header.split(',').some(t => {
    const trimmed = t.trim();
    return !trimmed.startsWith('W/') && trimmed === tag;
  });
}

/**
 * Determines whether a resource has been modified after the given date.
 *
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
 *
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
 *
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
