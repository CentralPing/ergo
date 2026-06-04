import type { SecurityHeadersOptions } from '../ergo.js';

declare function securityHeaders(options?: SecurityHeadersOptions): () => { response: { headers: [string, string][] } };

export default securityHeaders;
