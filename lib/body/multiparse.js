/**
 * @fileoverview RFC 7578 multipart/form-data parser.
 *
 * Parses a fully buffered `multipart/form-data` body into an array of part descriptors.
 * Each part contains parsed headers, the binary body buffer, and convenience shortcuts
 * for the `Content-Disposition` `name` and `filename` parameters.
 *
 * Uses Buffer-level KMP split (`utils/iterables/buffer-split`) for efficient binary
 * boundary detection without converting the entire body to a string.
 *
 * Only the MIME headers explicitly allowed by RFC 7578 §4.8 are parsed:
 * `Content-Disposition`, `Content-Type`, `Content-Transfer-Encoding`.
 *
 * @module lib/body/multiparse
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./multipart/headers.js
 * @requires ../../utils/iterables/buffer-split.js
 * @requires ../../utils/iterables/chain.js
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7578}
 *
 * @example
 * import multiparse from 'ergo/lib/body/multiparse';
 *
 * const parts = multiparse(rawBodyBuffer, 'boundary-string');
 * // parts => [{headers: {...}, name: 'file', filename: 'upload.txt', body: Buffer}]
 */
// https://www.rfc-editor.org/rfc/rfc7578
import parseHeaders from './multipart/headers.js';
import bufferSplit from '../../utils/iterables/buffer-split.js';
import chain from '../../utils/iterables/chain.js';

const CRLF = Buffer.from('\r\n');
const CRLFCRLF = Buffer.from('\r\n\r\n');

/**
 * Parses a multipart/form-data body buffer according to RFC 7578.
 *
 * Each part is returned as an object with:
 *  - headers: parsed headers (content-disposition, content-type, etc.)
 *  - body: Buffer of the part body
 *  - name: shortcut to content-disposition name parameter
 *  - filename: shortcut to content-disposition filename parameter (if present)
 *
 * @param {import('node:buffer').Buffer|string} rawbody - the raw body buffer (from writer.js)
 * @param {string} boundary - the multipart boundary string
 * @param {object} [options] - Parser options
 * @param {number} [options.maxParts=100] - Maximum number of parts to parse
 * @returns {object[]} - array of parsed parts
 */
const DEFAULT_MAX_PARTS = 100;

export default (rawbody, boundary, {maxParts = DEFAULT_MAX_PARTS} = {}) => {
  // Boundaries are prefixed with '--' per RFC 7578
  const delimiter = Buffer.from(`--${boundary}`);

  // Wrap in an array so bufferSplit iterable works over a single-chunk source
  const source = [Buffer.isBuffer(rawbody) ? rawbody : Buffer.from(rawbody)];

  // Split body on the boundary delimiter; yields [index, buffer] pairs
  const parts = chain(source, bufferSplit(delimiter));

  const results = [];

  for (const [index, partBuf] of parts) {
    // index 0 is preamble (before first boundary), skip it
    // The last part will be just '--\r\n' (closing boundary) or empty, skip it too
    if (index === 0) {
      continue;
    }

    // Each part buffer starts with \r\n after the boundary delimiter
    // and may end with \r\n before the next boundary delimiter
    // Strip leading CRLF
    let content = partBuf;
    if (content.slice(0, CRLF.length).equals(CRLF)) {
      content = content.slice(CRLF.length);
    }

    // Strip trailing CRLF
    if (content.slice(-CRLF.length).equals(CRLF)) {
      content = content.slice(0, -CRLF.length);
    }

    // The closing boundary part ends with '--'; skip it
    if (content.length >= 2 && content[0] === 0x2d && content[1] === 0x2d) {
      continue;
    }

    if (results.length >= maxParts) break;

    // Split headers from body on the first CRLFCRLF sequence
    const separatorIdx = indexOfSequence(content, CRLFCRLF);

    if (separatorIdx === -1) {
      // Malformed part: no header/body separator
      continue;
    }

    const headerSection = content.slice(0, separatorIdx);
    const body = content.slice(separatorIdx + CRLFCRLF.length);

    // Split header section into individual header lines
    const headerLines = splitBuffer(headerSection, CRLF).map(b => b.toString());

    const headers = parseHeaders(headerLines);

    const disposition = headers['content-disposition'] ?? {};
    const params = disposition.parameters ?? {};

    results.push({
      headers,
      name: params.name,
      filename: params.filename,
      body
    });
  }

  return results;
};

/**
 * Find the first occurrence of a sequence (needle) in a buffer (haystack).
 * Returns the index of the first byte of the sequence, or -1 if not found.
 *
 * @param {import('node:buffer').Buffer} haystack - Buffer to search within
 * @param {import('node:buffer').Buffer} needle - Byte sequence to find
 * @returns {number} - Index of the first match, or -1
 */
function indexOfSequence(haystack, needle) {
  const nLen = needle.length;
  outer: for (let i = 0; i <= haystack.length - nLen; i++) {
    for (let j = 0; j < nLen; j++) {
      if (haystack[i + j] !== needle[j]) {
        continue outer;
      }
    }
    return i;
  }
  return -1;
}

/**
 * Split a buffer by a separator buffer, returning an array of Buffer slices.
 *
 * @param {import('node:buffer').Buffer} buf - Buffer to split
 * @param {import('node:buffer').Buffer} sep - Separator byte sequence
 * @returns {import('node:buffer').Buffer[]} - Array of Buffer slices between separators
 */
function splitBuffer(buf, sep) {
  const results = [];
  let start = 0;
  const sLen = sep.length;

  for (let i = 0; i <= buf.length - sLen; i++) {
    let match = true;
    for (let j = 0; j < sLen; j++) {
      if (buf[i + j] !== sep[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      results.push(buf.slice(start, i));
      start = i + sLen;
      i += sLen - 1;
    }
  }

  results.push(buf.slice(start));
  return results;
}
