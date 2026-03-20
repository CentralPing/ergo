# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-03-20

### Added

- Initial public release as `ergo` (unscoped).
- Composable Fast Fail middleware pipeline with four-stage architecture (Negotiation, Authorization, Validation, Execution).
- RFC-compliant middleware: content negotiation, authorization (Basic/Bearer), body parsing (JSON/multipart/URL-encoded), cookie handling, CORS, CSRF protection, rate limiting, security headers, cache control, conditional requests, compression, and more.
- Structured error responses via RFC 9457 Problem Details.
- Prefer header support (RFC 7240).
- Web Linking support (RFC 8288).
- Pure ESM with Node.js >= 22.
