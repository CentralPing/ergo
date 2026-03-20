/**
 * @fileoverview Multipart MIME header parser for RFC 7578 parts.
 *
 * Parses an array of header line strings from a multipart/form-data part into a structured
 * object. Extracts parameter key-value pairs from headers with directives (e.g.
 * `Content-Disposition: form-data; name="file"; filename="upload.txt"`).
 *
 * Only the headers explicitly allowed by RFC 7578 §4.8 are retained:
 * - `content-disposition`
 * - `content-type`
 * - `content-transfer-encoding` (deprecated but present in legacy clients)
 *
 * @module lib/body/multipart/headers
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../../../utils/iterables/exec-all.js
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7578 RFC 7578 - Returning Values from Forms: multipart/form-data}
 *
 * @example
 * import parseHeaders from 'ergo/lib/body/multipart/headers';
 *
 * parseHeaders(['Content-Disposition: form-data; name="field1"']);
 * // => {'content-disposition': {type: 'form-data', parameters: {name: 'field1'}}}
 */
import execAll from '../../../utils/iterables/exec-all.js';

const headerRegExp = /^([^:]+):\s*([^;]+);?\s*(.*?)$/;
const directivesRegExp = /\s*([^=]+)=\s*(?:"([^"]+)"|([^;\s]+));?/;

/**
 * Allowed headers are restricted to:
 *  Content-Disposition https://www.rfc-editor.org/rfc/rfc7578#section-4.2,
 *  Content-Type https://www.rfc-editor.org/rfc/rfc7578#section-4.4
 *  and Content-Transfer-Encoding (deprecated) https://www.rfc-editor.org/rfc/rfc7578#section-4.7.
 *
 * https://www.rfc-editor.org/rfc/rfc7578#section-4.8
 */
const allowed = ['content-disposition', 'content-type', 'content-transfer-encoding'];

const reAll = execAll(directivesRegExp);

/**
 * @param {Array<import('node:buffer').Buffer|string>} [buffers=[]] - Array of header line buffers from a multipart part
 * @param {object} [headers] - Initial headers object; defaults to `{content-type: {type: 'text/plain'}}` when omitted
 * @returns {object} - Parsed headers keyed by lowercase header name with `{type, parameters}` values
 */
export default (buffers = [], headers) => {
  const base =
    headers !== undefined
      ? Object.assign(Object.create(null), headers)
      : Object.assign(Object.create(null), {'content-type': {type: 'text/plain'}});
  return buffers
    .map(buffer => headerRegExp.exec(buffer.toString().trim()))
    .filter(m => m !== null)
    .reduce((obj, [, prop, type, parameters]) => {
      const lcProp = prop.toLowerCase();

      if (allowed.includes(lcProp)) {
        const params = Object.create(null);
        for (const [k, quoted, unquoted] of reAll(parameters)) {
          params[k] = quoted ?? unquoted;
        }
        obj[lcProp] = {type, parameters: params};
      }

      return obj;
    }, base);
};
