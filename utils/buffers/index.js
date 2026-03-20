/**
 * @fileoverview Buffer utilities barrel export.
 *
 * Provides `match` (KMP substring search in Buffers) and `split` (Buffer split by separator).
 *
 * @module utils/buffers
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./match.js
 * @requires ./split.js
 */
export {default as match} from './match.js';
export {default as split} from './split.js';
