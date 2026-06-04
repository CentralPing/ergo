import type { IdempotencyOptions, IdempotencyResult } from '../ergo.js';

declare function idempotency(options?: IdempotencyOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, domainAcc: Record<string, unknown>) => IdempotencyResult | { value: IdempotencyResult; response: unknown } | { response: { statusCode: number; detail: string } };

export default idempotency;
