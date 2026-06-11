import type {LoggerOptions, LogEntry} from '../ergo.js';

declare function logger(
  options?: LoggerOptions
): ((
  req: import('node:http').IncomingMessage,
  res: import('node:http').ServerResponse,
  acc: Record<string, unknown>
) => LogEntry) & {readonly setPath: 'log'};

export default logger;
