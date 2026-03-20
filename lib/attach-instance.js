/**
 * @fileoverview Shared RFC 9457 instance injection helper.
 *
 * Auto-populates the `instance` property on an error from the response's
 * `x-request-id` header, formatted as a `urn:uuid:` URI.
 *
 * @module lib/attach-instance
 * @version 0.1.0
 * @since 0.1.0
 */

/**
 * Set `err.instance` from the response's `x-request-id` header if not already set.
 *
 * @param {Error & {instance?: string}} err - Error to annotate
 * @param {import('node:http').ServerResponse} res - HTTP response
 */
export default function attachInstance(err, res) {
  if (err.instance === undefined) {
    const requestId = res.getHeader?.('x-request-id');
    if (requestId) err.instance = `urn:uuid:${requestId}`;
  }
}
