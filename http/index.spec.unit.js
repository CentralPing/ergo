/**
 * @fileoverview Coverage tests for ergo barrel/entry-point modules.
 * Importing http/index.js, http/main.js, and http/json-api-query.js executes
 * the barrel and wrapper code, fulfilling coverage for those files.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';

// Importing the package entry point covers http/index.js and http/main.js
import * as ergo from './index.js';

describe('[Module] http/index - package entry point', () => {
  it('exports compose', () => assert.equal(typeof ergo.compose, 'function'));
  it('exports handler', () => assert.equal(typeof ergo.handler, 'function'));
  it('exports send', () => assert.equal(typeof ergo.send, 'function'));
  it('exports accepts', () => assert.equal(typeof ergo.accepts, 'function'));
  it('exports authorization', () => assert.equal(typeof ergo.authorization, 'function'));
  it('exports body', () => assert.equal(typeof ergo.body, 'function'));
  it('exports cacheControl', () => assert.equal(typeof ergo.cacheControl, 'function'));
  it('exports compress', () => assert.equal(typeof ergo.compress, 'function'));
  it('exports cookie', () => assert.equal(typeof ergo.cookie, 'function'));
  it('exports cors', () => assert.equal(typeof ergo.cors, 'function'));
  it('exports csrf', () => assert.equal(typeof ergo.csrf, 'function'));
  it('exports jsonApiQuery', () => assert.equal(typeof ergo.jsonApiQuery, 'function'));
  it('exports logger', () => assert.equal(typeof ergo.logger, 'function'));
  it('exports prefer', () => assert.equal(typeof ergo.prefer, 'function'));
  it('exports precondition', () => assert.equal(typeof ergo.precondition, 'function'));
  it('exports rateLimit', () => assert.equal(typeof ergo.rateLimit, 'function'));
  it('exports securityHeaders', () => assert.equal(typeof ergo.securityHeaders, 'function'));
  it('exports url', () => assert.equal(typeof ergo.url, 'function'));
  it('exports timeout', () => assert.equal(typeof ergo.timeout, 'function'));
  it('exports validate', () => assert.equal(typeof ergo.validate, 'function'));
  it('exports httpErrors', () => assert.equal(typeof ergo.httpErrors, 'function'));
});
