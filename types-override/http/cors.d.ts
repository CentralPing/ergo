import type { CorsOptions } from '../ergo.js';

declare function cors(options?: CorsOptions): (req: { headers?: Record<string, string | undefined>; method?: string }) => undefined | { response: { statusCode: 403 } } | { response: { headers: [string, string][] } };

export default cors;
