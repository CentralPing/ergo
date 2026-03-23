/**
 * Shared helpers for k6 benchmark scenarios.
 *
 * @module _helpers
 */

/**
 * Creates a handleSummary function for k6 that writes metrics to a JSON file.
 *
 * @param {string} defaultScenario - Fallback scenario name (e.g. '01-baseline-get')
 * @returns {function} k6 handleSummary callback
 */
export function createHandleSummary(defaultScenario) {
  return function handleSummary(data) {
    const framework = __ENV.FRAMEWORK || 'unknown';
    const scenario = __ENV.SCENARIO || defaultScenario;
    const trial = __ENV.TRIAL || '1';

    return {
      [`/results/${framework}--${scenario}--trial${trial}-summary.json`]: JSON.stringify({
        framework,
        scenario,
        trial: Number(trial),
        metrics: {
          http_reqs: data.metrics.http_reqs,
          http_req_duration: data.metrics.http_req_duration,
          http_req_failed: data.metrics.http_req_failed,
        },
      }),
      stdout: '\n',
    };
  };
}

/**
 * Safely extract a JSON field from a k6 response.
 * Returns undefined (rather than throwing) if the body is not valid JSON.
 *
 * @param {object} r - k6 response object
 * @param {string} field - JSON field name to extract
 * @returns {*} The field value or undefined
 */
export function safeJson(r, field) {
  try {
    return r.json(field);
  } catch {
    return undefined;
  }
}
