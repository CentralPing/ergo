import type { UrlResult } from '../ergo.js';

declare function url(): (req: { url?: string }) => UrlResult;

export default url;
