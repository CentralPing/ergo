/**
 * @fileoverview Async iterables utilities barrel export.
 *
 * Exports composable generator-based utilities for building lazy data pipelines.
 * Designed for use with `chain()` to compose pipelines:
 *   `chain(source, bufferSplit(sep), map(fn), reduce(fn, init))`
 *
 * @module utils/iterables
 * @version 0.1.0
 * @since 0.1.0
 */
export {default as bufferSplit} from './buffer-split.js';
export {default as chain} from './chain.js';
export {default as execAll} from './exec-all.js';
export {default as filter} from './filter.js';
export {default as forEach} from './for-each.js';
export {default as fromStream} from './from-stream.js';
export {default as map} from './map.js';
export {default as range} from './range.js';
export {default as reduce} from './reduce.js';
export {default as take} from './take.js';
