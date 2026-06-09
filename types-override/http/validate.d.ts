import type { ValidateSchemas, ValidateOptions } from '../ergo.js';

type ValidateReturn = (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, acc: Record<string, unknown>) => undefined | { response: { statusCode: number; detail: string; details?: unknown } };

declare function validate(schemas?: ValidateSchemas, options?: ValidateOptions): ValidateReturn;
declare function validate(schema: Record<string, unknown>, options?: ValidateOptions): ValidateReturn;

export default validate;
