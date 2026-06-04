declare function jsonApiQuery(...options: any[]): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, acc: { url?: { query?: Record<string, string | string[]> } }) => undefined | { response: { statusCode: 400; detail: string } };

export default jsonApiQuery;
