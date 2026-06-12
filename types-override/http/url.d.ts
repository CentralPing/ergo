import type {UrlResult} from '../ergo.js';

declare function url(): ((req?: {url?: string}) => UrlResult) & {readonly setPath: 'url'};

export default url;
