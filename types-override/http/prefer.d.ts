import type { PreferResult } from '../ergo.js';

declare function prefer(): (req: import('node:http').IncomingMessage) => PreferResult;

export default prefer;
