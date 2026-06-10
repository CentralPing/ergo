import type { ResponseInfo } from '../ergo.js';

declare function buildResponseInfo(
  req: import('node:http').IncomingMessage,
  res: import('node:http').ServerResponse,
  startTime: number
): ResponseInfo;

export default buildResponseInfo;
