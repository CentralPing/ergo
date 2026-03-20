/**
 * @fileoverview HTTP middleware factory for structured request/response logging.
 *
 * Logs request completion events as structured objects to the configured log function.
 * Each log entry includes operationally essential fields:
 * - Request: method, URL, headers, client IP, HTTP version, request ID
 * - Response: status code, duration (ms), headers, and status message
 * - Host: static machine identity (hostname, arch, platform, pid)
 *
 * The request ID is resolved using a three-step chain:
 * 1. `res.getHeader(headerRequestIdName)` — set by ergo-router's transport layer (primary path)
 * 2. `req.headers[headerRequestIdName]` — set by an upstream proxy (standalone fallback)
 * 3. `uuid()` — generates a new UUID when no upstream ID is available
 *
 * The response header is only set when not already present, so a transport-layer ID
 * is never overwritten.
 *
 * System metrics (CPU, memory, load average) are intentionally excluded — OTel treats
 * logs and metrics as distinct observability signals. Collect system metrics via a
 * dedicated metrics pipeline at periodic intervals, not per-request.
 *
 * Environment variables (`process.env`) are intentionally excluded from logs to prevent
 * accidental secret leakage.
 *
 * @module http/logger
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:os
 * @requires node:crypto
 *
 * @example
 * import {compose, logger} from 'ergo';
 *
 * const pipeline = compose(
 *   [logger(), [], 'log'],
 *   // On finish logs: {"requestId":"...","method":"GET","url":"/users","statusCode":200,"duration":12,...}
 * );
 */
import {hostname} from 'node:os';
import {randomUUID} from 'node:crypto';

const host = Object.freeze({
  hostname: hostname(),
  arch: process.arch,
  platform: process.platform,
  pid: process.pid
});

/**
 * Creates a structured request/response logging middleware.
 *
 * @param {object} [options] - Logger configuration
 * @param {function} [options.log] - Log function for completed requests (default: console.log)
 * @param {function} [options.error] - Log function for errors (default: console.error)
 * @param {function} [options.uuid] - Fallback UUID generator used only when no upstream request ID
 *   is found on the response or request headers (default: crypto.randomUUID)
 * @param {string} [options.headerRequestIdName] - Request ID header name (default: 'x-request-id')
 * @param {string} [options.headerRequestIpName] - Client IP header name (default: 'x-real-ip')
 * @returns {object} - Log entry with request metadata and host info (statusCode/duration added on finish)
 */
export default ({
    /* eslint-disable-next-line no-console */
    log = console.log,
    /* eslint-disable-next-line no-console */
    error: logError = console.error,
    uuid = randomUUID,
    headerRequestIdName = 'x-request-id',
    headerRequestIpName = 'x-real-ip'
  } = {}) =>
  (req, res) => {
    const time = performance.now();
    const timestamp = Date.now();
    const requestId =
      res.getHeader(headerRequestIdName) || req.headers[headerRequestIdName] || uuid();
    const ip = req.headers[headerRequestIpName];

    if (!res.getHeader(headerRequestIdName)) {
      res.setHeader(headerRequestIdName, requestId);
    }

    const info = {
      requestId,
      timestamp,
      ip,
      method: req.method,
      url: req.url,
      httpVersion: req.httpVersion,
      host,
      request: {
        headers: req.headers,
        encrypted: req.socket?.encrypted,
        remoteAddress: req.socket?.remoteAddress,
        remotePort: req.socket?.remotePort
      }
    };

    res.on('finish', finish);
    res.on('close', abort);
    res.on('error', error);

    return {...info};

    /** Removes all response event listeners. */
    function cleanup() {
      res.removeListener('finish', finish);
      res.removeListener('close', abort);
      res.removeListener('error', error);
    }

    /**
     * @param {boolean} aborted - Whether the connection was aborted before completion
     */
    function finish(aborted) {
      cleanup();

      info[aborted ? 'inprogressTime' : 'duration'] = performance.now() - time;
      info.statusCode = res.statusCode;

      info.response = {
        headers: res.getHeaders(),
        statusMessage: res.statusMessage,
        writableFinished: res.writableFinished
      };

      log(info);
    }

    /** Handles connection close before response completes. */
    function abort() {
      finish(true);
    }

    /**
     * @param {*} err - The error emitted by the response stream
     */
    function error(err) {
      logError({
        requestId,
        timestamp,
        name: err?.name,
        message: err?.message,
        status: err?.status,
        statusCode: err?.statusCode,
        originalError: err?.originalError,
        stack: err?.stack
      });
    }
  };
