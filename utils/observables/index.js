/**
 * @fileoverview Observable (push-based) utilities barrel export.
 *
 * Provides generator-based push-model primitives for event-driven pipelines where
 * data is pushed in (via `.next(value)`) rather than pulled. Used for streaming
 * body parsing and other real-time data flows.
 *
 * @module utils/observables
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./buffer-split.js
 * @requires ./chain.js
 * @requires ./map.js
 * @requires ./take.js
 */
export {default as bufferSplit} from './buffer-split.js';
export {default as chain} from './chain.js';
export {default as map} from './map.js';
export {default as take} from './take.js';
