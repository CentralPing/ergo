/**
 * @fileoverview Entry point for the ergo package.
 *
 * Re-exports the main module, enabling both `import 'ergo'` (ESM)
 * and `require('ergo')` (CJS compat) as equivalent entry points.
 *
 * @module ergo
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./main.js
 */

export * from './main.js';
