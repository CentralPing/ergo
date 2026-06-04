declare function jsonApiQuery(options?: Record<string, unknown>, schema?: Record<string, unknown>): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, acc: { url?: { query?: Record<string, string | string[]> } }) => undefined | { response: { statusCode: 400; detail: string } };

export default jsonApiQuery;
