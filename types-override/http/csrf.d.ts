import type { CsrfOptions, CookieJar } from '../ergo.js';

interface CsrfMiddleware {
  issue: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, acc: { cookies?: CookieJar }) => void;
  verify: (req: { headers?: Record<string, string | string[] | undefined> }, res: import('node:http').ServerResponse, acc: { cookies?: CookieJar }) => undefined | { response: { statusCode: 403; detail: string } };
}

declare function csrf(options: CsrfOptions): CsrfMiddleware;

export default csrf;
