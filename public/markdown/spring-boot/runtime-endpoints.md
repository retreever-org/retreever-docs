---
title: Runtime Endpoints
---

# Runtime Endpoints

Retreever Studio calls runtime endpoints to load the generated API document, read configured environment variables, and manage Retreever authentication.

Most teams do not need to call these endpoints directly. They are documented here for troubleshooting, automation, smoke checks, and teams that want to understand what Retreever exposes inside the host application.

All runtime endpoints are served under `/retreever`.

## Endpoint Reference

| Endpoint | Purpose |
| --- | --- |
| `GET /retreever/ping` | Returns Retreever availability. When startup scanning failed, it returns `503 Service Unavailable`. |
| `GET /retreever/doc` | Returns the generated API document used by the Studio. |
| `GET /retreever/environment` | Returns configured environment variables and automation rules. |
| `POST /retreever/login` | Logs in to Retreever Studio when Retreever authentication is enabled. Returns `404` when Retreever authentication is disabled. |
| `POST /retreever/refresh` | Refreshes Retreever auth cookies when Retreever authentication is enabled. Returns `404` when Retreever authentication is disabled. |
| `POST /retreever/logout` | Clears Retreever auth cookies when Retreever authentication is enabled. Returns `404` when Retreever authentication is disabled. |

## Availability Checks

`GET /retreever/ping` provides a lightweight check that Retreever started successfully.

```text
GET /retreever/ping
```

When Retreever is available, the response contains status and uptime information. When Retreever failed during startup, the endpoint returns `503 Service Unavailable` so the host application's logs can be inspected without guessing whether the Studio failed in the browser or on the server.

## Authentication Endpoints

The login, refresh, and logout endpoints exist only for Retreever's own authentication flow. They do not authenticate users for the host application's APIs.

When Retreever authentication is disabled, these auth endpoints return `404 Not Found`.

The login request body is:

```json
{
  "username": "admin",
  "password": "change-me"
}
```

When Host Managed Authentication is configured, Retreever still receives the same payload and passes the submitted values to the host authenticator as `principal` and `credential`.

## Browser Security Headers

Retreever applies browser security headers to Retreever routes. These headers are scoped to Retreever-owned responses and are not a replacement for the host application's security headers on business APIs.

| Header | Value source |
| --- | --- |
| `Content-Security-Policy` | `RetreeverSecurityHeadersFilter.CONTENT_SECURITY_POLICY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Camera, microphone, geolocation, payment, USB, serial, Bluetooth, and clipboard-read are disabled. |
