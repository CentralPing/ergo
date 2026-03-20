import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createNegotiator from './accepts.js';

describe('[Boundary] lib/accepts', () => {
  it('returns negotiator defaults when no options and no Accept headers', () => {
    // With no types constraint and no Accept header, negotiator returns its default
    // (e.g. '*/*' for type, 'identity' for encoding, etc.)
    const negotiate = createNegotiator();
    const result = negotiate({});
    // We just verify the shape — not null/undefined errors
    assert.equal(typeof result, 'object');
    assert.ok('type' in result);
    assert.ok('language' in result);
    assert.ok('charset' in result);
    assert.ok('encoding' in result);
  });

  it('returns undefined when no types match the Accept header', () => {
    const negotiate = createNegotiator({types: ['application/json']});
    const result = negotiate({accept: 'text/html'});
    assert.equal(result.type, undefined);
  });

  describe('media type (Accept)', () => {
    it('returns the best matching type', () => {
      const negotiate = createNegotiator({types: ['application/json', 'text/html']});
      const result = negotiate({accept: 'text/html,application/json;q=0.9'});
      assert.equal(result.type, 'text/html');
    });

    it('returns undefined when no type matches', () => {
      const negotiate = createNegotiator({types: ['application/json']});
      const result = negotiate({accept: 'text/html'});
      assert.equal(result.type, undefined);
    });

    it('selects best type based on quality value', () => {
      const negotiate = createNegotiator({types: ['application/json', 'text/plain']});
      const result = negotiate({accept: 'application/json;q=0.5,text/plain;q=1.0'});
      assert.equal(result.type, 'text/plain');
    });
  });

  describe('language (Accept-Language)', () => {
    it('returns the best matching language', () => {
      const negotiate = createNegotiator({languages: ['en', 'fr']});
      const result = negotiate({'accept-language': 'fr,en;q=0.8'});
      assert.equal(result.language, 'fr');
    });

    it('returns undefined when no language matches', () => {
      const negotiate = createNegotiator({languages: ['en']});
      const result = negotiate({'accept-language': 'de'});
      assert.equal(result.language, undefined);
    });
  });

  describe('encoding (Accept-Encoding)', () => {
    it('returns a supported encoding when matched', () => {
      const negotiate = createNegotiator({encodings: ['gzip', 'br']});
      const result = negotiate({'accept-encoding': 'gzip'});
      assert.equal(result.encoding, 'gzip');
    });

    it('returns undefined when encoding not in supported list', () => {
      const negotiate = createNegotiator({encodings: ['br']});
      const result = negotiate({'accept-encoding': 'gzip'});
      assert.equal(result.encoding, undefined);
    });
  });

  describe('charset (Accept-Charset)', () => {
    it('returns the best matching charset', () => {
      const negotiate = createNegotiator({charsets: ['utf-8', 'utf-16']});
      const result = negotiate({'accept-charset': 'utf-8'});
      assert.equal(result.charset, 'utf-8');
    });
  });
});
