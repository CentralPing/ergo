import type { TimeoutOptions, ResponseAccumulator } from '../ergo.js';

declare function timeout(options?: TimeoutOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, domainAcc: Record<string, unknown>, responseAcc: ResponseAccumulator) => void;

export default timeout;
