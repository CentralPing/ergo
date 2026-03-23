/**
 * @fileoverview RegExp exec-all generator for iterating all matches in a string.
 *
 * Creates a generator function that iterates all non-overlapping regex matches in a
 * string, yielding the capture groups (not the full match) for each. Ensures the `g`
 * flag is added to avoid infinite loops with stateful regexes.
 *
 * @module utils/iterables/exec-all
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import execAll from 'ergo/utils/iterables/exec-all';
 *
 * const findWords = execAll(/([a-z]+)/ig);
 * [...findWords('hello world')] // => [['hello'], ['world']]
 */

/**
 * @param {RegExp} re - Regular expression pattern (global flag added if missing)
 * @returns {function} - Generator function `(str) => Generator<string[]>` yielding match arrays
 */
export default re => {
  const localRe = new RegExp(re, [...new Set([...re.flags, 'g'])].join(''));

  /**
   * @param {string} str - Input string to match against the pattern
   */
  return function* (str) {
    localRe.lastIndex = 0;
    let match;

    while ((match = localRe.exec(str)) !== null) {
      yield match.slice(1);
      if (match[0].length === 0) {
        // Advance past zero-length match; use code-point width for Unicode regexes
        const cp = str.codePointAt(localRe.lastIndex);
        localRe.lastIndex += localRe.unicode && cp !== undefined && cp > 0xffff ? 2 : 1;
      }
    }
  };
};
