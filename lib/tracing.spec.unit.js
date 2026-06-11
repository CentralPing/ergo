/**
 * @fileoverview Boundary tests for lib/tracing.js shared primitive.
 *
 * Validates:
 * - createTracer() returns an OTEL Tracer instance
 * - extractContext() extracts W3C trace context from headers
 * - injectContext() sets trace headers on response
 * - statusFromHttp() maps HTTP status codes to OTEL span status
 * - Re-exports of OTEL API constants
 *
 * Uses only `@opentelemetry/api` (no SDK) — the API returns no-op
 * implementations when no provider is registered, keeping tests
 * portable across Node.js, Deno, and Bun.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {
  createTracer,
  headerGetter,
  extractContext,
  injectContext,
  statusFromHttp,
  trace,
  context,
  propagation,
  SpanStatusCode,
  SpanKind
} from '../lib/tracing.js';

describe('lib/tracing', () => {
  describe('createTracer()', () => {
    it('returns a Tracer with default name', () => {
      const tracer = createTracer();
      assert.equal(typeof tracer, 'object');
      assert.equal(typeof tracer.startSpan, 'function');
    });

    it('returns a Tracer with custom name', () => {
      const tracer = createTracer('custom-tracer', '1.0.0');
      assert.equal(typeof tracer, 'object');
      assert.equal(typeof tracer.startSpan, 'function');
    });

    it('returns a tracer whose startSpan produces spans with the OTEL span API', () => {
      const tracer = createTracer('test');
      const span = tracer.startSpan('test-span');
      assert.equal(typeof span.end, 'function');
      assert.equal(typeof span.setAttribute, 'function');
      assert.equal(typeof span.setStatus, 'function');
      assert.equal(typeof span.spanContext, 'function');
      const ctx = span.spanContext();
      assert.equal(typeof ctx.traceId, 'string');
      assert.equal(typeof ctx.spanId, 'string');
      span.end();
    });
  });

  describe('headerGetter', () => {
    it('get() returns the header value by key', () => {
      const headers = {traceparent: '00-abc-def-01'};
      assert.equal(headerGetter.get(headers, 'traceparent'), '00-abc-def-01');
    });

    it('keys() returns all header names', () => {
      const headers = {traceparent: '00-abc-def-01', tracestate: 'foo=bar'};
      assert.deepEqual(headerGetter.keys(headers), ['traceparent', 'tracestate']);
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
      assert.equal(typeof ctx, 'object');
      assert.ok(ctx !== null);
    });

    it('returns root context when no trace headers present', () => {
      const ctx = extractContext({});
      assert.equal(typeof ctx, 'object');
      assert.ok(ctx !== null);
    });
  });

  describe('injectContext()', () => {
    it('injects traceparent header via the registered propagator', () => {
      const traceId = 'a'.repeat(32);
      const spanId = 'b'.repeat(16);
      const mockPropagator = {
        inject(_ctx, carrier, setter) {
          setter.set(carrier, 'traceparent', `00-${traceId}-${spanId}-01`);
        },
        extract(ctx) {
          return ctx;
        },
        fields() {
          return ['traceparent'];
        }
      };
      propagation.setGlobalPropagator(mockPropagator);

      try {
        const headers = {};
        const res = {
          headersSent: false,
          setHeader(k, v) {
            headers[k] = v;
          }
        };
        injectContext(context.active(), res);

        assert.equal(
          headers.traceparent,
          `00-${traceId}-${spanId}-01`,
          'traceparent header should be injected'
        );
      } finally {
        propagation.disable();
      }
    });

    it('does not set headers when response already sent', () => {
      let called = false;
      const res = {
        headersSent: true,
        setHeader() {
          called = true;
        }
      };
      injectContext(context.active(), res);
      assert.equal(called, false, 'setHeader should not be called when headersSent is true');
    });
  });

  describe('statusFromHttp()', () => {
    it('returns UNSET for 1xx status codes', () => {
      assert.equal(statusFromHttp(100).code, SpanStatusCode.UNSET);
    });

    it('returns UNSET for 2xx status codes', () => {
      assert.equal(statusFromHttp(200).code, SpanStatusCode.UNSET);
    });

    it('returns UNSET for 3xx status codes', () => {
      assert.equal(statusFromHttp(301).code, SpanStatusCode.UNSET);
    });

    it('returns UNSET for 4xx status codes (client errors)', () => {
      assert.equal(statusFromHttp(404).code, SpanStatusCode.UNSET);
    });

    it('returns ERROR for 5xx status codes', () => {
      const result = statusFromHttp(500);
      assert.equal(result.code, SpanStatusCode.ERROR);
      assert.equal(typeof result.message, 'string');
    });
  });

  describe('re-exports', () => {
    it('exports SpanStatusCode enum', () => {
      assert.equal(typeof SpanStatusCode, 'object');
      assert.equal(typeof SpanStatusCode.UNSET, 'number');
      assert.equal(typeof SpanStatusCode.OK, 'number');
      assert.equal(typeof SpanStatusCode.ERROR, 'number');
    });

    it('exports SpanKind enum', () => {
      assert.equal(typeof SpanKind, 'object');
      assert.equal(typeof SpanKind.SERVER, 'number');
    });

    it('exports trace namespace', () => {
      assert.equal(typeof trace, 'object');
      assert.equal(typeof trace.getTracer, 'function');
    });

    it('exports context namespace', () => {
      assert.equal(typeof context, 'object');
      assert.equal(typeof context.active, 'function');
    });

    it('exports propagation namespace', () => {
      assert.equal(typeof propagation, 'object');
      assert.equal(typeof propagation.extract, 'function');
      assert.equal(typeof propagation.inject, 'function');
    });
  });
});
