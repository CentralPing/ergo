import type { AcceptsOptions, AcceptsResult } from '../ergo.js';

declare function accepts(options?: AcceptsOptions): (req: { headers?: Record<string, string | string[] | undefined> }) => AcceptsResult | { response: { statusCode: 406; detail: string } };

export default accepts;
