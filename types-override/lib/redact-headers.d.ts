/** Default set of header names to redact. */
export declare const DEFAULT_REDACTED_HEADERS: Set<string>;

/**
 * Return a copy of `headers` with values for names in `redactSet` replaced
 * by `'[REDACTED]'`.
 */
export declare function redactHeaders(
  headers: Record<string, string | string[] | number | undefined>,
  redactSet?: Set<string> | null
): Record<string, string | string[] | number | undefined>;
