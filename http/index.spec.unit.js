/**
 * @fileoverview Coverage tests for ergo barrel/entry-point modules.
 * Importing http/index.js, http/main.js, and http/json-api-query.js executes
 * the barrel and wrapper code, fulfilling coverage for those files.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';

// Importing the package entry point covers http/index.js and http/main.js
import * as ergo from './index.js';
import * as main from './main.js';

/** Canonical named export surface for `@centralping/ergo` / `http/main.js`. */
const EXPECTED_EXPORTS = Object.freeze([
  'accepts',
  'authorization',
  'body',
  'cacheControl',
  'compose',
  'compress',
  'cookie',
  'cors',
  'createResponseAcc',
  'csrf',
  'fromConnect',
  'handler',
  'httpErrors',
  'idempotency',
  'jsonApiQuery',
  'logger',
  'mergeResponse',
  'paginate',
  'precondition',
  'prefer',
  'rateLimit',
  'securityHeaders',
  'send',
  'timeout',
  'tracing',
  'url',
  'validate'
]);

/**
 * @param {object} ns - ESM namespace object
 * @param {string} label - Assertion label prefix
 * @returns {undefined}
 */
function assertNamedExportSurface(ns, label) {
  assert.equal('default' in ns, false, `${label}: must not export default`);
  assert.deepEqual(
    Object.keys(ns).sort(),
    [...EXPECTED_EXPORTS],
    `${label}: exact named export set`
  );
  for (const name of EXPECTED_EXPORTS) {
    assert.equal(typeof ns[name], 'function', `${label}: ${name} must be a function`);
  }
}

describe('[Module] http/index - package entry point', () => {
  it('exports the canonical named surface only (no default)', () => {
    assertNamedExportSurface(ergo, 'http/index');
  });
});

describe('[Module] http/main - aggregation barrel', () => {
  it('exports the canonical named surface only (no default)', () => {
    assertNamedExportSurface(main, 'http/main');
  });
});
