/**
 * @fileoverview Pure Prefer header parser (RFC 7240).
 *
 * Parses the HTTP `Prefer` request header into a plain object of preference
 * name-value pairs using character-by-character scanning that enforces the
 * RFC 9110 `token` and `quoted-string` grammars.
 *
 * Supports:
 * - Simple tokens (`respond-async` → `{'respond-async': true}`)
 * - Token=value pairs (`return=minimal` → `{return: 'minimal'}`)
 * - Quoted values with RFC 9110 §5.6.4 qdtext/quoted-pair handling
 * - Multiple comma-separated preferences (context-sensitive, not split-based)
 * - Per-preference parameters after semicolons (stripped)
 * - Graceful degradation: malformed preferences are silently skipped
 *
 * Used by:
 * - `http/prefer.js` (ergo pipeline middleware)
 *
 * @module lib/prefer
 * @since 0.1.0
 *
 * @example
 * import parsePrefer from '@centralping/ergo/lib/prefer';
 *
 * parsePrefer('return=minimal');
 * // {return: 'minimal'}
 *
 * parsePrefer('respond-async, wait=100');
 * // {'respond-async': true, wait: '100'}
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7240 RFC 7240 — Prefer Header for HTTP}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-5.6.2 RFC 9110 §5.6.2 — Tokens}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-5.6.4 RFC 9110 §5.6.4 — Quoted Strings}
 */

/**
 * RFC 9110 §5.6.2 token character lookup table. Index by character code;
 * `true` when the code is a valid `tchar`.
 *
 * tchar = "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "." /
 *         "^" / "_" / "`" / "|" / "~" / DIGIT / ALPHA
 *
 * @type {ReadonlyArray<boolean>}
 */
const TOKEN_CHARS = /* @__PURE__ */ (() => {
  const table = new Array(128).fill(false);
  const chars = "!#$%&'*+-.^_`|~";
  for (let i = 0; i < chars.length; i++) table[chars.charCodeAt(i)] = true;
  for (let c = 0x30; c <= 0x39; c++) table[c] = true; // DIGIT
  for (let c = 0x41; c <= 0x5a; c++) table[c] = true; // ALPHA upper
  for (let c = 0x61; c <= 0x7a; c++) table[c] = true; // ALPHA lower
  return Object.freeze(table);
})();

/**
 * Advance past optional whitespace (OWS: SP 0x20, HTAB 0x09).
 *
 * @param {string} str - input string
 * @param {number} start - current position
 * @returns {number} - position after whitespace
 */
function skipOWS(str, start) {
  let i = start;
  while (i < str.length) {
    const ch = str.charCodeAt(i);
    if (ch !== 0x20 && ch !== 0x09) break;
    i++;
  }
  return i;
}

/**
 * Scan a run of RFC 9110 §5.6.2 token characters.
 *
 * @param {string} str - input string
 * @param {number} start - start position
 * @returns {number} - end position (exclusive) of the token run
 */
function scanToken(str, start) {
  let i = start;
  while (i < str.length) {
    const code = str.charCodeAt(i);
    if (code >= 128 || !TOKEN_CHARS[code]) break;
    i++;
  }
  return i;
}

/**
 * Advance to the next unquoted comma, respecting quoted strings.
 *
 * @param {string} str - input string
 * @param {number} start - current position
 * @returns {number} - position of the comma, or string length
 */
function skipToNextComma(str, start) {
  let i = start;
  while (i < str.length) {
    const ch = str.charCodeAt(i);
    if (ch === 0x2c) return i;
    if (ch === 0x22) {
      let j = i + 1;
      while (j < str.length) {
        const qch = str.charCodeAt(j);
        if (qch === 0x22) {
          j++;
          break;
        }
        if (qch === 0x5c && j + 1 < str.length) {
          j += 2;
          continue;
        }
        j++;
      }
      i = j;
      continue;
    }
    i++;
  }
  return i;
}

/**
 * Parse an RFC 9110 §5.6.4 quoted-string starting at the opening DQUOTE.
 *
 * Validates qdtext characters and unescapes quoted-pair sequences. Returns
 * `undefined` as the value when the quoted-string contains characters
 * outside the qdtext/quoted-pair grammar (e.g. bare CTLs), indicating
 * the enclosing preference should be skipped.
 *
 * @param {string} str - input string
 * @param {number} start - position of the opening DQUOTE
 * @returns {{value: string | undefined, end: number}} - parsed value and
 *   position after the closing DQUOTE; `value` is `undefined` when the
 *   quoted-string is malformed
 */
function parseQuotedString(str, start) {
  let i = start + 1;
  let value = '';
  let segmentStart = i;
  let valid = true;

  while (i < str.length) {
    const ch = str.charCodeAt(i);

    if (ch === 0x22) {
      if (valid) value += str.slice(segmentStart, i);
      return {value: valid ? value : undefined, end: i + 1};
    }

    if (ch === 0x5c && i + 1 < str.length) {
      const next = str.charCodeAt(i + 1);
      // quoted-pair target: HTAB / SP / VCHAR (%x21-7E) / obs-text (%x80-FF)
      if (next === 0x09 || (next >= 0x20 && next <= 0xff && next !== 0x7f)) {
        if (valid) {
          value += str.slice(segmentStart, i);
          value += str[i + 1];
        }
        i += 2;
        segmentStart = i;
        continue;
      }
      valid = false;
      i += 2;
      segmentStart = i;
      continue;
    }

    // qdtext: HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text (%x80-FF)
    if (
      ch === 0x09 ||
      (ch >= 0x20 && ch <= 0x7e && ch !== 0x22 && ch !== 0x5c) ||
      (ch >= 0x80 && ch <= 0xff)
    ) {
      i++;
      continue;
    }

    valid = false;
    i++;
    segmentStart = i;
  }

  return {value: undefined, end: i};
}

/**
 * Parse a Prefer header value into a preferences object.
 *
 * @param {string} [header] - raw Prefer header value
 * @returns {object} - null-prototype map of preference name to value
 *   (string) or `true` for bare tokens
 */
export default function parsePrefer(header) {
  if (!header) return Object.create(null);

  const preferences = Object.create(null);
  const len = header.length;
  let pos = 0;

  while (pos < len) {
    pos = skipOWS(header, pos);
    if (pos >= len) break;
    if (header.charCodeAt(pos) === 0x2c) {
      pos++;
      continue;
    }

    const nameEnd = scanToken(header, pos);
    if (nameEnd === pos) {
      pos = skipToNextComma(header, pos) + 1;
      continue;
    }

    const name = header.slice(pos, nameEnd);
    pos = skipOWS(header, nameEnd);

    if (pos >= len || header.charCodeAt(pos) === 0x2c) {
      preferences[name] = true;
      if (pos < len) pos++;
      continue;
    }

    if (header.charCodeAt(pos) === 0x3b) {
      preferences[name] = true;
      pos = skipToNextComma(header, pos) + 1;
      continue;
    }

    if (header.charCodeAt(pos) !== 0x3d) {
      pos = skipToNextComma(header, pos) + 1;
      continue;
    }

    pos = skipOWS(header, pos + 1);

    let value;

    if (pos < len && header.charCodeAt(pos) === 0x22) {
      const qs = parseQuotedString(header, pos);
      if (qs.value === undefined) {
        pos = qs.end;
        if (pos < len && header.charCodeAt(pos) === 0x2c) pos++;
        continue;
      }
      value = qs.value;
      pos = qs.end;
    } else {
      const valueEnd = scanToken(header, pos);
      if (valueEnd === pos) {
        pos = skipToNextComma(header, pos) + 1;
        continue;
      }
      value = header.slice(pos, valueEnd);
      pos = valueEnd;
    }

    pos = skipOWS(header, pos);
    if (pos < len) {
      const next = header.charCodeAt(pos);
      if (next !== 0x3b && next !== 0x2c) {
        pos = skipToNextComma(header, pos) + 1;
        continue;
      }
    }

    preferences[name] = value;

    if (pos < len && header.charCodeAt(pos) === 0x3b) {
      pos = skipToNextComma(header, pos);
    }
    if (pos < len && header.charCodeAt(pos) === 0x2c) pos++;
  }

  return preferences;
}
