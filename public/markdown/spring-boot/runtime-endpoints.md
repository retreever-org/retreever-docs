---
title: Runtime Endpoints
---

# Runtime Endpoints

Retreever exposes its runtime endpoints under `/retreever`.

You do not need to call these endpoints directly to use the Studio. They are listed here for integration, troubleshooting, and automation use cases.

## Endpoint Reference

| Endpoint | Purpose |
| --- | --- |
| `GET /retreever/ping` | Returns Retreever availability and uptime. |
| `GET /retreever/doc` | Returns the generated API document. |
| `GET /retreever/environment` | Returns configured environment variables and automation rules. |
| `POST /retreever/login` | Logs in when Retreever auth is enabled. |
| `POST /retreever/refresh` | Refreshes Retreever auth cookies. |
| `POST /retreever/logout` | Clears Retreever auth cookies. |

## Browser Security Headers

Retreever applies these browser security headers only to `/retreever` routes:

| Header | Value source |
| --- | --- |
| `Content-Security-Policy` | `RetreeverSecurityHeadersFilter.CONTENT_SECURITY_POLICY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Camera, microphone, geolocation, payment, USB, serial, Bluetooth, and clipboard-read are disabled. |
