/**
 * @fileoverview Object property picker with dot-notation and rename support.
 *
 * Extracts specified paths from an object into a new object. Supports:
 * - String paths: `pick(obj, 'a.b')` extracts `obj.a.b` as `result.a.b`
 * - Rename tuples: `pick(obj, ['a.b', 'c'])` extracts `obj.a.b` as `result.c`
 *
 * @module utils/pick
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./get.js
 * @requires ./set.js
 *
 * @example
 * import pick from 'ergo/utils/pick';
 *
 * pick({a: {b: 1}, c: 2}, 'a.b', 'c')
 * // => {a: {b: 1}, c: 2}
 *
 * pick({user: {name: 'Alice'}}, ['user.name', 'name'])
 * // => {name: 'Alice'}
 */
import get from './get.js';
import set from './set.js';

/**
 * Picks values from an object at the specified dot-notation paths.
 *
 * @param {object} [obj={}] - Source object
 * @param {...(string|[string, string])} paths - Paths to extract; each may be a string
 *   or a `[readPath, setPath]` rename tuple
 * @returns {object} - New object with the extracted (and optionally renamed) values
 */
export default (obj = {}, ...paths) =>
  paths.flat().reduce((o, path) => {
    const [readPath, setPath = path] = Array.isArray(path) ? path : [path];

    set(o, setPath, get(obj, readPath));

    return o;
  }, Object.create(null));
