import type { PreconditionOptions } from '../ergo.js';

declare function precondition(options?: PreconditionOptions): (req: import('node:http').IncomingMessage) => undefined | { response: { statusCode: 428 } };

export default precondition;
