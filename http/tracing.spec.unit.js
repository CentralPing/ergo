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
 */
import {describe, it, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert/strict';
import tracing from '../http/tracing.js';
import {trace, propagation} from '@opentelemetry/api';
import otelSdk from '@opentelemetry/sdk-trace-node';

const {NodeTracerProvider, InMemorySpanExporter, SimpleSpanProcessor} = otelSdk;

describe('http/tracing', () => {
  let provider;
  let exporter;

  beforeEach(() => {
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)]
    });
    provider.register();
  });

  afterEach(() => {
    provider.shutdown();
    propagation.disable();
    trace.disable();
  });

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
      const mw = tracing();
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

    it('sets http.method and http.url attributes on span', () => {
      const mw = tracing();
      const req = mockReq('POST', '/api/users');
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans.length, 1);
      assert.equal(spans[0].attributes['http.method'], 'POST');
      assert.equal(spans[0].attributes['http.url'], '/api/users');
    });

    it('applies custom attributes from options', () => {
      const mw = tracing({attributes: {'service.version': '1.0.0'}});
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans[0].attributes['service.version'], '1.0.0');
    });

    it('span is SERVER kind', () => {
      const mw = tracing();
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans[0].kind, 1); // SpanKind.SERVER = 1
    });

    it('extracts parent context from incoming traceparent header', () => {
      const parentTraceId = '0af7651916cd43dd8448eb211c80319c';
      const parentSpanId = 'b7ad6b7169203331';
      const mw = tracing();
      const req = mockReq('GET', '/', {
        traceparent: `00-${parentTraceId}-${parentSpanId}-01`
      });
      const res = mockRes();

      const result = mw(req, res, {});
      result.value.span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans[0].spanContext().traceId, parentTraceId);
      assert.equal(spans[0].parentSpanContext.spanId, parentSpanId);
    });
  });

  describe('perStage option', () => {
    it('does not include tracer in value when perStage is false (default)', () => {
      const mw = tracing();
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});
      assert.equal(result.value.tracer, undefined);
      result.value.span.end();
    });

    it('includes tracer in value when perStage is true', () => {
      const mw = tracing({perStage: true});
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
      const mw = tracing();
      const req = mockReq();
      const res = mockRes();

      const result = mw(req, res, {});

      // No finished spans yet — span is still open
      const spans = exporter.getFinishedSpans();
      assert.equal(spans.length, 0);

      result.value.span.end();

      assert.equal(exporter.getFinishedSpans().length, 1);
    });
  });
});
