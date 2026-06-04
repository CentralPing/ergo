import type { RateLimitOptions } from '../ergo.js';

declare function rateLimit(options?: RateLimitOptions): (req: import('node:http').IncomingMessage) => { response: { statusCode: 429; retryAfter: number } } | { response: { headers: [string, string][] } };

export default rateLimit;
