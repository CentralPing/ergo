/**
 * @fileoverview Named constants for stable OpenTelemetry HTTP semantic conventions.
 *
 * Provides the four attribute names used by ergo's tracing infrastructure.
 * Local constants avoid a runtime dependency on `@opentelemetry/semantic-conventions`
 * (11.3 MB unpacked for 4 strings).
 *
 * @module lib/otel-attributes
 * @since 0.8.0
 * @see https://opentelemetry.io/docs/specs/semconv/http/
 */

/** @type {string} - HTTP request method (e.g. GET, POST) */
export const ATTR_HTTP_REQUEST_METHOD = 'http.request.method';

/** @type {string} - HTTP response status code (e.g. 200, 404) */
export const ATTR_HTTP_RESPONSE_STATUS_CODE = 'http.response.status_code';

/** @type {string} - URL path component (e.g. /api/users) */
export const ATTR_URL_PATH = 'url.path';

/** @type {string} - URL query string without the leading '?' (e.g. page=1&limit=10) */
export const ATTR_URL_QUERY = 'url.query';
