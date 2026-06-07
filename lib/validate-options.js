/**
 * @fileoverview Factory-time option key validation with Levenshtein suggestions.
 *
 * Provides a shared utility for all ergo middleware factories to validate incoming
 * option keys against a known set at factory invocation time. Unknown keys emit a
 * deduplicated `process.emitWarning` with `{type: 'ErgoWarning'}` and a "did you mean?"
 * suggestion when the Levenshtein edit distance is within threshold.
 *
 * Combines the Levenshtein distance algorithm from ergo-router's `lib/validate-config.js`
 * with the deduplication and warning emission pattern from ergo's `http/validate.js`.
 *
 * @module lib/validate-options
 * @since 0.5.0
 *
 * @example
 * import {validateOptions} from '@centralping/ergo/lib/validate-options';
 *
 * const VALID_OPTIONS = new Set(['types', 'languages', 'charsets', 'encodings', 'throwIfFail']);
 *
 * export default (options = {}) => {
 *   validateOptions(options, VALID_OPTIONS, 'accepts');
 *   const {throwIfFail = true, ...rest} = options;
 *   // ...
 * };
 */

/**
 * Maximum Levenshtein distance for "did you mean?" suggestions.
 * @type {number}
 */
const MAX_SUGGESTION_DISTANCE = 3;

/** @type {Set<string>} - Tracks emitted warning keys to prevent duplicate warnings per process. */
const emittedWarnings = new Set();

/**
 * Compute the Levenshtein distance between two strings.
 *
 * Uses the Wagner-Fischer dynamic programming algorithm with a single-row
 * optimization (O(min(a,b)) space).
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Edit distance
 */
export function levenshtein(a, b) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const short = a.length <= b.length ? a : b;
  const long = a.length <= b.length ? b : a;
  const shortLen = short.length;
  const longLen = long.length;
  const row = new Array(shortLen + 1);

  for (let i = 0; i <= shortLen; i++) {
    row[i] = i;
  }

  for (let j = 1; j <= longLen; j++) {
    let prev = row[0];
    row[0] = j;

    for (let i = 1; i <= shortLen; i++) {
      const cost = short[i - 1] === long[j - 1] ? 0 : 1;
      const temp = row[i];
      row[i] = Math.min(row[i] + 1, row[i - 1] + 1, prev + cost);
      prev = temp;
    }
  }

  return row[shortLen];
}

/**
 * Find the closest matching key from a set of valid keys.
 *
 * @param {string} unknown - The unknown key to find suggestions for
 * @param {Set<string>} validKeys - Set of valid key names
 * @returns {string|undefined} - The closest match within threshold, or undefined
 */
export function findSuggestion(unknown, validKeys) {
  let best;
  let bestDist = MAX_SUGGESTION_DISTANCE + 1;

  for (const valid of validKeys) {
    const dist = levenshtein(unknown, valid);
    if (dist < bestDist) {
      bestDist = dist;
      best = valid;
    }
  }

  return best;
}

/**
 * Validate option keys against a known set and emit a warning for unknown keys.
 *
 * Warnings are deduplicated per unique combination of warning code and sorted unknown
 * key names, so each distinct misconfiguration warns once per process. When a close
 * match is found (edit distance <= {@link MAX_SUGGESTION_DISTANCE}), the warning
 * includes a "did you mean?" suggestion.
 *
 * @param {object} [options] - The options object to validate. No-op when nullish.
 * @param {Set<string>} validKeys - Set of recognized option key names
 * @param {string} middlewareName - Factory name for the warning message and code
 * @returns {void}
 */
export function validateOptions(options, validKeys, middlewareName) {
  if (options == null || typeof options !== 'object') return;

  const unknownKeys = Object.keys(options).filter(k => !validKeys.has(k));
  if (unknownKeys.length === 0) return;

  const code = `ERGO_${middlewareName.replace(/[A-Z]/g, c => `_${c}`).toUpperCase()}_UNKNOWN_OPTION`;
  const dedupKey = `${code}:${[...unknownKeys].sort().join(',')}`;

  if (emittedWarnings.has(dedupKey)) return;
  emittedWarnings.add(dedupKey);

  const suggestions = unknownKeys.map(k => {
    const suggestion = findSuggestion(k, validKeys);
    return suggestion ? `"${k}" (did you mean "${suggestion}"?)` : `"${k}"`;
  });

  process.emitWarning(
    `${middlewareName}() received unknown option${unknownKeys.length > 1 ? 's' : ''}: ` +
      `${suggestions.join(', ')}. ` +
      `Valid options are: ${[...validKeys].sort().join(', ')}.`,
    {type: 'ErgoWarning', code}
  );
}
