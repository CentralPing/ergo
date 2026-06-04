import type { TracingOptions, TracingResult } from '../ergo.js';

declare function tracing(options?: TracingOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => { value: TracingResult };

export default tracing;
