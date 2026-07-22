import type { CacheControlOptions } from '../ergo.js';

export declare const DEFAULT_DIRECTIVES: string;

declare function cacheControl(options?: CacheControlOptions): () => { response: { headers: [string, string][] } };

export default cacheControl;
