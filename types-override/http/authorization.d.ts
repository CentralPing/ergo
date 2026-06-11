import type {AuthorizationOptions, AuthorizationResult} from '../ergo.js';

declare function authorization(
  options?: AuthorizationOptions
): ((req: {
  headers?: {authorization?: string};
}) => Promise<
  AuthorizationResult | {response: {statusCode: number; headers?: [string, string][]}}
>) & {readonly setPath: 'auth'};

export default authorization;
