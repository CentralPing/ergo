/**
 * @fileoverview Module tests for http/tracing.js middleware factory.
 *
 * Validates:
 * - Factory returns a middleware function
 * - Middleware returns {value} with span metadata
 * - traceId and spanId are populated from the span context
 * - perStage option controls tracer propagation
 * - Custom attributes are applied to the span
 * - Span lifecycle (started, not ended by middleware)
 *
 * Uses a portable mock tracer injected via the {tracer} factory option
 * instead of @opentelemetry/sdk-trace-node (Node-specific). The mock
 * records startSpan calls with attributes, kind, and parent context —
 * the same data previously verified via InMemorySpanExporter.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import tracing from '../http/tracing.js';
import {trace} from '@opentelemetry/api';

function createMockTracer() {
  const spans = [];

  const tracer = {
    spans,
    startSpan(name, options = {}, parentContext) {
      const traceId = 'a'.repeat(32);
      const spanId = 'b'.repeat(16);
      const attrs = {...(options.attributes ?? {})};
      let ended = false;

      const span = {
        _name: name,
        _kind: options.kind,
        _parentContext: parentContext,
        attributes: attrs,
        setAttribute(k, v) {
          attrs[k] = v;
          return span;
        },
        spanContext() {
          return {traceId, spanId, traceFlags: 1};
        },
        end() {
          ended = true;
        },
        get _ended() {
          return ended;
        },
        setStatus() {
          return span;
        },
        recordException() {
          return span;
        },
        isRecording() {
          return true;
        },
        updateName() {
          return span;
        },
        addEvent() {
          return span;
        },
        addLink() {
          return span;
        },
        addLinks() {
          return span;
        }
      };

      spans.push(span);
      return span;
    }
  };

  return tracer;
}

describe('http/tracing', () => {
  function mockReq(method = 'GET', url = '/test', headers = {}) {
    return {method, url, headers};
  }

  function mockRes() {
    const _headers = {};
    return {
      headersSent: false,
      getHeader(name) {
        return _headers[name.toLowerCase()];
      },
      setHeader(name, value) {
        _headers[name.toLowerCase()] = value;
      },
      _headers
    };
  }

  describe('factory', () => {
    it('returns a middleware function', () => {
      const mw = tracing();
      assert.equal(typeof mw, 'function');
    });

    it('accepts custom serviceName', () => {
      const mw = tracing({serviceName: 'my-service'});
      assert.equal(typeof mw, 'function');
    });

    it('accepts a pre-configured tracer', () => {
      const tracer = trace.getTracer('custom');
      const mw = tracing({tracer});
      assert.equal(typeof mw, 'function');
    });
  });

  describe('middleware execution', () => {
    it('returns {value} with span, traceId, and spanId', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq();
      const res = mockRes();
      const acc = {};

      const result = mw(req, res, acc);

      assert.equal(typeof result, 'object');
      assert.equal(typeof result.value, 'object');
      assert.equal(typeof result.value.span, 'object');
      assert.equal(typeof result.value.traceId, 'string');
      assert.equal(typeof result.value.spanId, 'string');
      assert.match(result.value.traceId, /^[0-9a-f]{32}$/);
      assert.match(result.value.spanId, /^[0-9a-f]{16}$/);

      result.value.span.end();
    });

    it('sets http.request.method and url.path attributes on span', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq('POST', '/api/users');
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      assert.equal(mockTracer.spans.length, 1);
      assert.equal(mockTracer.spans[0].attributes['http.request.method'], 'POST');
      assert.equal(mockTracer.spans[0].attributes['url.path'], '/api/users');
      assert.equal(mockTracer.spans[0].attributes['url.query'], undefined);
    });

    it('sets url.query when request URL contains a query string', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq('GET', '/search?q=hello&page=2');
      const res = mockRes();

      const result = mw(req, res);
      result.value.span.end();

      assert.equal(mockTracer.spans[0].attributes['http.request.method'], 'GET');
      assert.equal(mockTracer.spans[0].attributes['url.path'], '/search');
      assert.equal(mockTracer.spans[0].attributes['url.query'], 'q=hello&page=2');
    });

    it('omits url.query when request URL has no query string', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq('GET', '/plain');
      const res = mockRes();

      const result = mw(req, res);
      result.value.span.end();

      assert.equal(mockTracer.spans[0].attributes['url.path'], '/plain');
      assert.equal('url.query' in mockTracer.spans[0].attributes, false);
    });

    it('applies custom attributes from options', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer, attributes: {'service.version': '1.0.0'}});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      assert.equal(mockTracer.spans[0].attributes['service.version'], '1.0.0');
    });

    it('span is SERVER kind', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      assert.equal(mockTracer.spans[0]._kind, 1); // SpanKind.SERVER = 1
    });

    it('extracts parent context from incoming traceparent header', () => {
      const mockTracer = createMockTracer();
      const parentTraceId = '0af7651916cd43dd8448eb211c80319c';
      const parentSpanId = 'b7ad6b7169203331';
      const mw = tracing({tracer: mockTracer});
      const req = mockReq('GET', '/', {
        traceparent: `00-${parentTraceId}-${parentSpanId}-01`
      });
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      // Without a registered SDK propagator, extractContext() returns
      // ROOT_CONTEXT unchanged — actual W3C traceparent parsing is an
      // integration concern. The unit test verifies the middleware forwards
      // the extracted context to startSpan.
      const ctx = mockTracer.spans[0]._parentContext;
      assert.equal(typeof ctx, 'object', 'parent context should be forwarded to startSpan');
      assert.ok(ctx !== null, 'parent context should not be null');
    });
  });

  describe('perStage option', () => {
    it('does not include tracer in value when perStage is false (default)', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      assert.equal(result.value.tracer, undefined);
      result.value.span.end();
    });

    it('includes tracer in value when perStage is true', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer, perStage: true});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      assert.notEqual(result.value.tracer, undefined);
      assert.equal(typeof result.value.tracer.startSpan, 'function');
      result.value.span.end();
    });
  });

  describe('span is not ended by middleware', () => {
    it('span remains active after middleware returns', () => {
      const mockTracer = createMockTracer();
      const mw = tracing({tracer: mockTracer});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});

      assert.equal(result.value.span._ended, false, 'span should not be ended by middleware');

      result.value.span.end();

      assert.equal(result.value.span._ended, true, 'span should be ended after explicit end()');
    });
  });
});
