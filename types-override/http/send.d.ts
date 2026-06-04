import type { SendOptions, ResponseAccumulator } from '../ergo.js';

declare function send(options?: SendOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, responseAcc: ResponseAccumulator, domainAcc?: Record<string, unknown>) => void;

export default send;
