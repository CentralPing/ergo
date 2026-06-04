import type { CompressOptions } from '../ergo.js';

declare function compress(options?: CompressOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => void;

export default compress;
