import type {BodyOptions, BodyResult} from '../ergo.js';

declare function body(
  options?: BodyOptions
): ((
  req: import('node:http').IncomingMessage
) => Promise<BodyResult | {response: {statusCode: number; detail: string}}>) & {
  readonly setPath: 'body';
};

export default body;
