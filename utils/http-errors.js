/**
 * @fileoverview HTTP error factory producing RFC 9457 Problem Details errors.
 *
 * Creates `Error`-prototype objects with RFC 9457 (Problem Details for HTTP APIs)
 * properties: `type`, `title`, `status`, `detail`, plus internal properties `headers`
 * and `originalError`. Uses `Object.create(Error.prototype)` instead of `new Error()`
 * to avoid V8's automatic stack trace capture (~10 µs overhead per call). This is
 * critical in hot paths like rate-limit rejections where errors are expected control
 * flow, not exceptional conditions. The objects pass `instanceof Error` checks.
 *
 * The `toJSON()` method serializes to RFC 9457 format automatically when
 * `JSON.stringify()` is called (e.g. by `send()`).
 *
 * All Ergo middleware throws these errors directly. The `handler()` middleware
 * catches them and forwards to `send()` for serialization.
 *
 * @module utils/http-errors
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:http
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9457 RFC 9457 - Problem Details for HTTP APIs}
 *
 * @example
 * import httpErrors from 'ergo/utils/http-errors';
 *
 * throw httpErrors(404);
 * // Error { name: 'NotFound', status: 404, type: 'https://...', title: 'Not Found', detail: 'Not Found' }
 * // JSON.stringify → {"type":"https://...","title":"Not Found","status":404,"detail":"Not Found"}
 *
 * throw httpErrors(422, {detail: 'Invalid email', details: errors});
 * // Error { name: 'UnprocessableEntity', status: 422, detail: 'Invalid email', details: [...] }
 */
import {STATUS_CODES} from 'node:http';

const baseUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/';

/**
 * @param {number} [statusCode=500] - HTTP status code
 * @param {object} [options] - RFC 9457 Problem Details fields
 * @param {string} [options.type] - RFC 9457 `type` URI (defaults to MDN docs link)
 * @param {string} [options.detail] - RFC 9457 `detail` (human-readable explanation)
 * @param {string} [options.message] - Alias for `detail` (backward compat)
 * @param {Array<[string, string]>} [options.headers] - Response headers to attach
 * @param {string} [options.instance] - RFC 9457 `instance` URI identifying the specific occurrence
 * @param {number|string} [options.retryAfter] - Retry-After value (seconds or HTTP-date).
 *   Auto-appended to `headers` as `['Retry-After', String(value)]` and included in toJSON().
 * @param {Error} [options.originalError] - Underlying error
 * @returns {Error} - Error with RFC 9457 properties and `toJSON()` method
 */
export default function httpErrors(
  statusCode = 500,
  {
    type = STATUS_CODES[statusCode] ? `${baseUrl}${statusCode}` : undefined,
    message,
    detail: rawDetail = message,
    headers,
    instance,
    retryAfter,
    originalError,
    ...extra
  } = {}
) {
  const title = STATUS_CODES[statusCode] ?? STATUS_CODES[500];
  const detail = rawDetail ?? title;
  const name = title.replace(/\s/g, '');

  const effectiveHeaders =
    retryAfter != null ? [...(headers ?? []), ['Retry-After', String(retryAfter)]] : headers;

  if (retryAfter != null) {
    extra.retryAfter = retryAfter;
  }

  const err = Object.create(Error.prototype);
  err.message = detail;
  err.name = name;
  err.statusCode = statusCode;
  err.status = statusCode;
  err.type = type;
  err.title = title;
  err.detail = detail;
  err.instance = instance;
  err.headers = effectiveHeaders;
  err.originalError = originalError;
  if (extra) Object.assign(err, extra);
  err.message = detail;
  err.name = name;
  err.statusCode = statusCode;
  err.status = statusCode;
  err.type = type;
  err.title = title;
  err.detail = detail;

  const extraKeys = Object.keys(extra);

  Object.defineProperty(err, 'toJSON', {
    value() {
      const json = {};
      for (const key of extraKeys) {
        json[key] = this[key];
      }
      json.type = this.type;
      json.title = this.title;
      json.status = this.status;
      json.detail = this.detail;
      if (this.instance !== undefined) json.instance = this.instance;
      return json;
    }
  });

  return err;
}
