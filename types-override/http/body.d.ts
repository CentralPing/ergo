import type { BodyOptions, BodyResult } from '../ergo.js';

declare function body(options?: BodyOptions): (req: import('node:http').IncomingMessage) => Promise<BodyResult | { response: { statusCode: number; detail: string } }>;

export default body;
