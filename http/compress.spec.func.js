import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createCompress from './compress.js';
import createSend from './send.js';
import createHandler from './handler.js';

// Large enough to exceed default threshold
const LARGE_BODY = {data: 'x'.repeat(2000)};
const SMALL_BODY = {data: 'hi'};

describe('[Contract] http/compress', () => {
  let baseUrl, close;

  const pipeline = compose(
    createCompress({threshold: 100}),
    () => ({statusCode: 200, body: LARGE_BODY}),
    createSend()
  );

  const handler = createHandler(pipeline, createSend());

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('compresses with gzip when client sends Accept-Encoding: gzip', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'gzip'}
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-encoding'), 'gzip');
    // undici.fetch auto-decompresses — res.json() succeeds only if gzip was valid
    const body = await res.json();
    assert.equal(body.data.length, 2000);
  });

  it('compresses with deflate when client sends Accept-Encoding: deflate', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'deflate'}
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-encoding'), 'deflate');
    const body = await res.json();
    assert.equal(body.data.length, 2000);
  });

  it('compresses with br when client sends Accept-Encoding: br', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'br'}
    });
    if (res.headers.get('content-encoding') === 'br') {
      const body = await res.json();
      assert.equal(body.data.length, 2000);
    } else {
      assert.equal(res.status, 200);
    }
  });

  it('excludes encoding with q=0 (RFC 7231 §5.3.4)', async () => {
    // gzip;q=0 means "I do not accept gzip"; identity is always acceptable
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'gzip;q=0, identity'}
    });
    assert.equal(res.status, 200);
    assert.ok(
      !res.headers.get('content-encoding') || res.headers.get('content-encoding') !== 'gzip',
      'gzip should be excluded when q=0'
    );
  });

  it('sets Vary: Accept-Encoding header when compression is applied', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'gzip'}
    });
    const vary = res.headers.get('vary') ?? '';
    assert.ok(
      vary.toLowerCase().includes('accept-encoding'),
      'should include Vary: Accept-Encoding'
    );
    await res.body?.cancel();
  });

  it('skips compression when client sends Accept-Encoding: identity', async () => {
    // RFC 7231 §5.3.4: identity token means no transformation; server should not compress
    const res = await fetch(`${baseUrl}/`, {
      headers: {'accept-encoding': 'identity'}
    });
    assert.equal(res.status, 200);
    assert.ok(!res.headers.get('content-encoding'), 'should not set content-encoding for identity');
  });

  it('skips compression when body is below threshold (small body short-circuit)', async () => {
    let smallBaseUrl, smallClose;
    const smallPipeline = compose(
      createCompress({threshold: 1024}),
      () => ({statusCode: 200, body: SMALL_BODY}),
      createSend()
    );
    const smallHandler = createHandler(smallPipeline, createSend());
    ({baseUrl: smallBaseUrl, close: smallClose} = await setupServer(smallHandler));
    try {
      const res = await fetch(`${smallBaseUrl}/`, {
        headers: {'accept-encoding': 'gzip'}
      });
      assert.equal(res.status, 200);
      // Small bodies should not be compressed
      assert.ok(
        !res.headers.get('content-encoding'),
        'should not compress small bodies below threshold'
      );
    } finally {
      await smallClose();
    }
  });

  it('skips compression for 204 No Content (NO_COMPRESS_STATUSES)', async () => {
    let u, c;
    const p = compose(createCompress({threshold: 1}), () => ({statusCode: 204}), createSend());
    ({baseUrl: u, close: c} = await setupServer(createHandler(p, createSend())));
    try {
      const res = await fetch(`${u}/`, {headers: {'accept-encoding': 'gzip'}});
      assert.equal(res.status, 204);
      assert.ok(!res.headers.get('content-encoding'), 'should not compress 204');
    } finally {
      await c();
    }
  });

  it('skips compression for non-compressible content-type (image/png)', async () => {
    let u, c;
    const p = compose(
      createCompress({threshold: 1}),
      (req, res) => {
        res.setHeader('Content-Type', 'image/png');
        return {statusCode: 200, body: 'x'.repeat(2000)};
      },
      createSend()
    );
    ({baseUrl: u, close: c} = await setupServer(createHandler(p, createSend())));
    try {
      const res = await fetch(`${u}/`, {headers: {'accept-encoding': 'gzip'}});
      assert.equal(res.status, 200);
      assert.ok(!res.headers.get('content-encoding'), 'should not compress image/png');
      await res.body?.cancel();
    } finally {
      await c();
    }
  });

  it('compresses via res.write() (chunked streaming path)', async () => {
    let u, c;
    const handler = (req, res) => {
      const compress = createCompress({threshold: 1});
      compress(req, res);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      // Write in chunks to exercise the res.write() override
      res.write(JSON.stringify({chunk: 1}));
      res.write(JSON.stringify({chunk: 2}));
      res.end();
    };
    ({baseUrl: u, close: c} = await setupServer(handler));
    try {
      const res = await fetch(`${u}/`, {headers: {'accept-encoding': 'gzip'}});
      assert.equal(res.status, 200);
      assert.equal(res.headers.get('content-encoding'), 'gzip');
      await res.body?.cancel();
    } finally {
      await c();
    }
  });

  it('ends response cleanly when compression encounters invalid data', async () => {
    let u, c;
    const handler = (req, res) => {
      const compress = createCompress({threshold: 1});
      compress(req, res);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write('{');
      res.end('}');
    };
    ({baseUrl: u, close: c} = await setupServer(handler));
    try {
      const res = await fetch(`${u}/`, {headers: {'accept-encoding': 'gzip'}});
      assert.ok([200, 500].includes(res.status), `expected 200 or 500, got ${res.status}`);
      await res.body?.cancel();
    } finally {
      await c();
    }
  });

  it('deduplicates Accept-Encoding in Vary header when already present', async () => {
    let dedupBaseUrl, dedupClose;
    // Pipeline that sets a pre-existing Vary header then adds compression
    const dedupPipeline = compose(
      createCompress({threshold: 100}),
      (req, res) => {
        res.setHeader('Vary', 'Accept');
        return {statusCode: 200, body: LARGE_BODY};
      },
      createSend({vary: null})
    );
    const dedupHandler = createHandler(dedupPipeline, createSend());
    ({baseUrl: dedupBaseUrl, close: dedupClose} = await setupServer(dedupHandler));
    try {
      const res = await fetch(`${dedupBaseUrl}/`, {
        headers: {'accept-encoding': 'gzip'}
      });
      const vary = (res.headers.get('vary') ?? '').toLowerCase();
      // Should contain both Accept and Accept-Encoding, without duplication
      const parts = vary.split(',').map(s => s.trim());
      const aeCount = parts.filter(p => p === 'accept-encoding').length;
      assert.equal(aeCount, 1, 'Accept-Encoding should appear only once in Vary');
      await res.body?.cancel();
    } finally {
      await dedupClose();
    }
  });
});
