/**
 * @fileoverview Constructor-name-based type detection utility.
 *
 * Returns the constructor name of any value, handling edge cases:
 * - `NaN` — returns `'NaN'` (not `'Number'`)
 * - Anonymous constructors (`name === ''`) — falls back to `Object.prototype.toString`
 * - `null`, `undefined`, primitives without constructors — falls back to `toString`
 *
 * Used throughout Ergo for duck-typing checks (e.g. `type(x) === 'AsyncGeneratorFunction'`).
 *
 * @module utils/type
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import type from 'ergo/utils/type';
 *
 * type(42)              // 'Number'
 * type(NaN)             // 'NaN'
 * type(null)            // 'Null'
 * type([])              // 'Array'
 * type(async function*(){}) // 'AsyncGeneratorFunction'
 */

/**
 * @param {*} o - Value to inspect
 * @returns {string} - Constructor name (e.g. 'String', 'Array', 'NaN')
 */
export default o => {
  // Use a try in the case of `undefined`, `null` or any value that may
  //  not have a constructor property
  try {
    const type = o.constructor.name;

    switch (type) {
      case 'Number':
        // Special Case for NaN
        return Number.isNaN(o) ? 'NaN' : type;
      case '':
        return {}.toString.call(o).slice(8, -1);
      default:
        return type;
    }
  } catch {
    return {}.toString.call(o).slice(8, -1);
  }
};
