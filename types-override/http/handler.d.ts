import type { HandlerOptions } from '../ergo.js';

declare function handler(pipeline: (...args: any[]) => any, options?: HandlerOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<void>;

export default handler;
