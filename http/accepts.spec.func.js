import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createAccepts from './accepts.js';
import createSend from './send.js';
import createHandler from './handler.js';

describe('[Contract] http/accepts', () => {
  let baseUrl, close;

  const pipeline = compose(
    [
      createAccepts({
        types: ['application/json', 'text/html'],
        throwIfFail: true
      }),
      [],
      'accepts'
    ],
    (_req, _res, acc) => ({statusCode: 200, body: acc.accepts}),
    createSend()
  );

  const handler = createHandler(pipeline, createSend());

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('negotiates content type from Accept header', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {accept: 'application/json'}
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.type, 'application/json');
  });

  it('returns 406 when Accept cannot be satisfied', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {accept: 'text/xml'}
    });
    assert.equal(res.status, 406);
  });

  it('selects best type based on quality factor', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {accept: 'text/html;q=0.9,application/json;q=1.0'}
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.type, 'application/json');
  });
});
