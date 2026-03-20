/**
 * @fileoverview Deep property setter with dot-notation path support.
 *
 * Sets a value at a dot-delimited path in an object, creating intermediate objects
 * or arrays as needed. Uses `Object.hasOwn()` to check for existing nodes.
 * Array nodes are created when the next path segment is a valid integer string.
 *
 * @module utils/set
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import set from 'ergo/utils/set';
 *
 * const obj = {};
 * set(obj, 'a.b.c', 42);   // obj => {a: {b: {c: 42}}}
 * set(obj, 'tags.0', 'x'); // obj.tags => ['x']
 */

/**
 * @param {object} obj - Target object
 * @param {string} [path=''] - Dot-delimited property path
 * @param {*} val - Value to assign
 * @returns {*} - The assigned value
 */
export default (obj, path = '', val) => {
  const subPaths = path.split('.');

  return (subPaths
    .slice(0, -1)
    .reduce(
      (o, p, i) =>
        Object.hasOwn(o, p)
          ? o[p]
          : (o[p] = Number.isNaN(Number(subPaths[i + 1])) ? Object.create(null) : []),
      obj
    )[subPaths.at(-1)] = val);
};
