/**
 * @fileoverview Contract tests for OpenTelemetry tracing integration.
 *
 * Validates the full request lifecycle with a real HTTP server:
 * - Trace context propagation (incoming traceparent → child span)
 * - Span lifecycle (started by middleware, ended by handler after send)
 * - Logger trace correlation (traceId/spanId in log output)
 * - Per-stage spans when perStage is enabled
 * - Zero overhead when tracing middleware is not in pipeline
 */
import {describe, it, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {compose, tracing, logger, handler} from '../http/main.js';
import {trace, propagation} from '@opentelemetry/api';
import otelSdk from '@opentelemetry/sdk-trace-node';

const {NodeTracerProvider, InMemorySpanExporter, SimpleSpanProcessor} = otelSdk;

function setupServer(requestHandler) {
  const server = http.createServer(requestHandler);
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      const {port} = server.address();
      const baseUrl = `http://127.0.0.1:${port}`;
      resolve({
        server,
        baseUrl,
        close() {
          server.closeAllConnections();
          return new Promise(res => server.close(res));
        }
      });
    });
  });
}

describe('http/tracing contract', () => {
  let provider;
  let exporter;
  let ctx;

  beforeEach(() => {
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)]
    });
    provider.register();
  });

  afterEach(async () => {
    if (ctx) {
      await ctx.close();
      ctx = undefined;
    }
    provider.shutdown();
    propagation.disable();
    trace.disable();
  });

  it('creates a pipeline span for each request', async () => {
    const pipeline = compose({fn: tracing(), setPath: 'trace'}, () => ({
      response: {body: {ok: true}, statusCode: 200}
    }));

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/test`);
    assert.equal(res.status, 200);

    const traceparent = res.headers.get('traceparent');
    assert.equal(typeof traceparent, 'string', 'response should include traceparent header');
    assert.match(traceparent, /^00-[0-9a-f]{32}-[0-9a-f]{16}-[0-9a-f]{2}$/);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);
    assert.equal(spans[0].name, 'ergo.pipeline');
    assert.equal(spans[0].attributes['http.request.method'], 'GET');
    assert.equal(spans[0].attributes['url.path'], '/test');
    assert.equal(spans[0].attributes['http.response.status_code'], 200);
  });

  it('propagates incoming trace context as parent', async () => {
    const parentTraceId = '0af7651916cd43dd8448eb211c80319c';
    const parentSpanId = 'b7ad6b7169203331';

    const pipeline = compose({fn: tracing(), setPath: 'trace'}, () => ({
      response: {body: {ok: true}, statusCode: 200}
    }));

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`, {
      headers: {traceparent: `00-${parentTraceId}-${parentSpanId}-01`}
    });
    assert.equal(res.status, 200);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);
    assert.equal(spans[0].spanContext().traceId, parentTraceId);
    assert.equal(spans[0].parentSpanContext.spanId, parentSpanId);
  });

  it('sets span status ERROR for 5xx responses', async () => {
    const pipeline = compose({fn: tracing(), setPath: 'trace'}, () => ({
      response: {statusCode: 503, detail: 'Service Unavailable'}
    }));

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 503);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);
    assert.equal(spans[0].status.code, 2); // SpanStatusCode.ERROR = 2
    assert.equal(spans[0].attributes['http.response.status_code'], 503);
  });

  it('sets span status UNSET for 4xx responses', async () => {
    const pipeline = compose({fn: tracing(), setPath: 'trace'}, () => ({
      response: {statusCode: 404, detail: 'Not Found'}
    }));

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 404);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);
    assert.equal(spans[0].status.code, 0); // SpanStatusCode.UNSET = 0
  });

  it('records exception on caught pipeline error', async () => {
    const pipeline = compose({fn: tracing(), setPath: 'trace'}, () => {
      throw new Error('boom');
    });

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 500);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);
    assert.equal(spans[0].status.code, 2); // ERROR

    const events = spans[0].events;
    assert.ok(events.length >= 1);
    assert.equal(events[0].name, 'exception');
  });

  it('provides traceId and spanId to logger via accumulator', async () => {
    let logOutput;
    const logFn = info => {
      logOutput = info;
    };

    const pipeline = compose(
      {fn: tracing(), setPath: 'trace'},
      {fn: logger({log: logFn}), setPath: 'log'},
      () => ({
        response: {body: {ok: true}, statusCode: 200}
      })
    );

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 200);

    // Wait for 'finish' event to fire
    await new Promise(r => setTimeout(r, 50));

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 1);

    // Logger should include traceId from the tracing middleware
    assert.equal(typeof logOutput?.traceId, 'string');
    assert.equal(logOutput.traceId, spans[0].spanContext().traceId);
    assert.equal(typeof logOutput?.spanId, 'string');
  });

  it('creates per-stage child spans when perStage is true', async () => {
    const pipeline = compose(
      {fn: tracing({perStage: true}), setPath: 'trace'},
      {fn: () => ({value: 'hello'}), setPath: 'greeting'},
      {fn: () => ({response: {body: {ok: true}, statusCode: 200}}), setPath: 'exec'}
    );

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 200);

    const spans = exporter.getFinishedSpans();
    // Root span + 2 child spans (greeting, exec) — tracing middleware itself is also a step
    // but it's the first step that sets up the tracer, so compose-with sees the tracer
    // starting from the NEXT step
    assert.ok(spans.length >= 3, `Expected at least 3 spans, got ${spans.length}`);

    const childSpans = spans.filter(s => s.name.startsWith('ergo.middleware.'));
    assert.ok(childSpans.length >= 2, `Expected at least 2 child spans, got ${childSpans.length}`);
  });

  it('creates no spans when tracing middleware is not in pipeline', async () => {
    const pipeline = compose(() => ({response: {body: {ok: true}, statusCode: 200}}));

    ctx = await setupServer(handler(pipeline));
    const res = await fetch(`${ctx.baseUrl}/`);
    assert.equal(res.status, 200);

    const spans = exporter.getFinishedSpans();
    assert.equal(spans.length, 0);
  });
});
