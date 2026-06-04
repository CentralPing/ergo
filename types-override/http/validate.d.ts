import type { ValidateSchemas, ValidateOptions } from '../ergo.js';

declare function validate(schemas?: ValidateSchemas, options?: ValidateOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, acc: Record<string, unknown>) => undefined | { response: { statusCode: number; detail: string; details?: unknown } };

export default validate;
