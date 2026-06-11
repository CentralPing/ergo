import type {CookieOptions, CookieJar} from '../ergo.js';

declare function cookie(
  options?: CookieOptions
): ((req: {headers?: {cookie?: string}}) => CookieJar) & {readonly setPath: 'cookies'};

export default cookie;
