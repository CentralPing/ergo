import type { CacheControlOptions } from '../ergo.js';

declare function cacheControl(options?: CacheControlOptions): () => { response: { headers: [string, string][] } };

export default cacheControl;
