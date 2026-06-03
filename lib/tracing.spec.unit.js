/**
 * @fileoverview Boundary tests for lib/tracing.js shared primitive.
 *
 * Validates:
 * - createTracer() returns an OTEL Tracer instance
 * - extractContext() extracts W3C trace context from headers
 * - injectContext() sets trace headers on response
 * - statusFromHttp() maps HTTP status codes to OTEL span status
 * - Re-exports of OTEL API constants
 */
import {describe, it, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {
  createTracer,
  headerGetter,
  extractContext,
  injectContext,
  statusFromHttp,
  trace,
  context,
  SpanStatusCode,
  SpanKind
} from '../lib/tracing.js';

import otelSdk from '@opentelemetry/sdk-trace-node';

const {NodeTracerProvider, InMemorySpanExporter, SimpleSpanProcessor} = otelSdk;

describe('lib/tracing', () => {
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
    trace.disable();
  });

  describe('createTracer()', () => {
    it('returns a Tracer with default name', () => {
      const tracer = createTracer();
      assert.equal(typeof tracer.startSpan, 'function');
    });

    it('returns a Tracer with custom name', () => {
      const tracer = createTracer('test-service', '1.0.0');
      const span = tracer.startSpan('test');
      span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans.length, 1);
      assert.equal(spans[0].instrumentationScope.name, 'test-service');
      assert.equal(spans[0].instrumentationScope.version, '1.0.0');
    });

    it('creates spans that are recorded by the SDK', () => {
      const tracer = createTracer('my-lib');
      const span = tracer.startSpan('operation', {
        attributes: {'test.key': 'test-value'}
      });
      span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans.length, 1);
      assert.equal(spans[0].name, 'operation');
      assert.equal(spans[0].attributes['test.key'], 'test-value');
    });
  });

  describe('headerGetter', () => {
    it('get() returns the header value by key', () => {
      const headers = {traceparent: 'value', host: 'example.com'};
      assert.equal(headerGetter.get(headers, 'traceparent'), 'value');
      assert.equal(headerGetter.get(headers, 'host'), 'example.com');
      assert.equal(headerGetter.get(headers, 'missing'), undefined);
    });

    it('keys() returns all header names', () => {
      const headers = {traceparent: 'v', tracestate: 's', host: 'h'};
      const result = headerGetter.keys(headers);
      assert.deepEqual(result, ['traceparent', 'tracestate', 'host']);
    });

    it('keys() returns empty array for empty headers', () => {
      assert.deepEqual(headerGetter.keys({}), []);
    });
  });

  describe('extractContext()', () => {
    it('returns a context from valid traceparent header', () => {
      const headers = {
        traceparent: '00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01'
      };
      const ctx = extractContext(headers);
      assert.notEqual(ctx, undefined);
    });

    it('returns root context when no trace headers present', () => {
      const ctx = extractContext({});
      assert.notEqual(ctx, undefined);
    });

    it('extracted context produces child spans with correct parent', () => {
      const traceId = '0af7651916cd43dd8448eb211c80319c';
      const parentSpanId = 'b7ad6b7169203331';
      const headers = {
        traceparent: `00-${traceId}-${parentSpanId}-01`
      };
      const ctx = extractContext(headers);
      const tracer = createTracer('test');
      const span = tracer.startSpan('child', {}, ctx);
      span.end();

      const spans = exporter.getFinishedSpans();
      assert.equal(spans.length, 1);
      assert.equal(spans[0].spanContext().traceId, traceId);
      assert.equal(spans[0].parentSpanContext.spanId, parentSpanId);
    });
  });

  describe('injectContext()', () => {
    it('sets traceparent header on response', () => {
      const tracer = createTracer('test');
      const span = tracer.startSpan('root');
      const ctx = trace.setSpan(context.active(), span);

      const headers = {};
      const res = {
        headersSent: false,
        setHeader(key, value) {
          headers[key] = value;
        }
      };

      injectContext(ctx, res);
      span.end();

      assert.equal(typeof headers.traceparent, 'string');
      assert.match(headers.traceparent, /^00-[0-9a-f]{32}-[0-9a-f]{16}-0[01]$/);
    });

    it('does not set headers when response already sent', () => {
      const tracer = createTracer('test');
      const span = tracer.startSpan('root');
      const ctx = trace.setSpan(context.active(), span);

      const headers = {};
      const res = {
        headersSent: true,
        setHeader(key, value) {
          headers[key] = value;
        }
      };

      injectContext(ctx, res);
      span.end();

      assert.equal(Object.keys(headers).length, 0);
    });
  });

  describe('statusFromHttp()', () => {
    it('returns UNSET for 1xx status codes', () => {
      assert.deepEqual(statusFromHttp(100), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(101), {code: SpanStatusCode.UNSET});
    });

    it('returns UNSET for 2xx status codes', () => {
      assert.deepEqual(statusFromHttp(200), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(201), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(204), {code: SpanStatusCode.UNSET});
    });

    it('returns UNSET for 3xx status codes', () => {
      assert.deepEqual(statusFromHttp(301), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(304), {code: SpanStatusCode.UNSET});
    });

    it('returns UNSET for 4xx status codes (client errors)', () => {
      assert.deepEqual(statusFromHttp(400), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(404), {code: SpanStatusCode.UNSET});
      assert.deepEqual(statusFromHttp(429), {code: SpanStatusCode.UNSET});
    });

    it('returns ERROR for 5xx status codes', () => {
      assert.deepEqual(statusFromHttp(500), {code: SpanStatusCode.ERROR, message: 'HTTP 500'});
      assert.deepEqual(statusFromHttp(502), {code: SpanStatusCode.ERROR, message: 'HTTP 502'});
      assert.deepEqual(statusFromHttp(503), {code: SpanStatusCode.ERROR, message: 'HTTP 503'});
    });
  });

  describe('re-exports', () => {
    it('exports SpanStatusCode enum', () => {
      assert.equal(typeof SpanStatusCode.UNSET, 'number');
      assert.equal(typeof SpanStatusCode.OK, 'number');
      assert.equal(typeof SpanStatusCode.ERROR, 'number');
    });

    it('exports SpanKind enum', () => {
      assert.equal(typeof SpanKind.SERVER, 'number');
      assert.equal(typeof SpanKind.CLIENT, 'number');
    });

    it('exports trace namespace', () => {
      assert.equal(typeof trace.getTracer, 'function');
    });

    it('exports context namespace', () => {
      assert.equal(typeof context.active, 'function');
    });
  });
});
