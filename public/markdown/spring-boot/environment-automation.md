---
title: Environment Automation
---

# Environment Automation

Most API testing flows reuse values: a token from login, a tenant id in every request, or an id returned by a create API. Environment automation lets the Studio receive those values from the application configuration and update them from API responses while testing.

Common examples include:

| Value | Typical use |
| --- | --- |
| Access token | Login once, reuse the token in secured requests. |
| Tenant id | Send the same tenant header across multiple endpoints. |
| Session id | Capture a response header and reuse it in later calls. |
| Locale, region, or device id | Keep test requests consistent without typing the same value repeatedly. |

The Studio loads this configuration from:

```text
GET /retreever/environment
```

Inside request URLs, query parameters, headers, authorization fields, and request bodies, variables are referenced with this placeholder format:

```text
{{variableName}}
```

## Static Variables

Use static variables when the value is known before any request runs and does not need to be captured from an API response.

Use static variables for:

| Value type |
| --- |
| Tenant ids used by many requests. |
| Device ids or client ids used in headers or bodies. |
| Locale, region, or test flags. |
| Non-secret test values that should be available as soon as Studio opens. |

For a single variable, use `retreever.env.variable`:

```yaml
retreever:
  env:
    variable:
      name: device-id
      value: device-web-001
```

For multiple variables, use `retreever.env.variables`:

```yaml
retreever:
  env:
    variables:
      - name: tenant-id
        value: tenant-demo
      - name: locale
        value: en-US
```

Static variables are returned to the Studio with `name` and `value`.

## Automated Variables

Use automated variables when the value is created or refreshed by an API response and should be reused by later requests.

Use automated variables for:

| Value type |
| --- |
| Access tokens returned by login or refresh APIs. |
| Session ids returned in response headers. |
| Correlation ids or request ids that later requests need to send back. |
| Entity ids created by one API and reused in follow-up calls. |

```yaml
retreever:
  env:
    variables:
      - name: access-token
        from:
          endpoints:
            - '[POST] /api/v1/public/login'
            - '[GET] /api/v1/public/login/refresh'
          extract:
            - '[BODY] data.access_token'
            - '[BODY] accessToken'

      - name: session-id
        from:
          endpoints:
            - '[POST] /api/v1/public/login'
          extract:
            - '[HEADER] X-Session-ID'
```

Each automated variable needs:

| Field | Required | Format |
| --- | --- | --- |
| `name` | Yes | Non-blank variable name. |
| `from.endpoints` | Yes | One or more endpoint matchers. String form is `[METHOD] /uri`. |
| `from.extract` | Yes | One or more extraction paths. String form is `[BODY] path` or `[HEADER] path`. |

Retreever normalizes endpoint methods to uppercase and endpoint URIs with a leading `/`.

Extraction sources are normalized to `BODY` or `HEADER`. `HEADERS` and `HEADER/HEADERS` are also normalized to `HEADER`.

## Object Form

Use string form when humans maintain the YAML directly. Use object form when configuration is generated, transformed, or validated by tooling.

```yaml
retreever:
  env:
    variables:
      - name: access-token
        from:
          endpoints:
            - method: POST
              uri: /api/v1/public/login
          extract:
            - source: BODY
              path: data.access_token
```

The document returned by `/retreever/environment` uses this object shape:

```json
{
  "variables": [
    {
      "name": "access-token",
      "from": {
        "endpoints": [
          {
            "method": "POST",
            "uri": "/api/v1/public/login"
          }
        ],
        "extract": [
          {
            "source": "BODY",
            "path": "data.access_token"
          }
        ]
      }
    }
  ]
}
```

## How Values Are Resolved

After a request completes in the Studio, the UI compares that request against configured automation rules. If the request method and path match a rule, the Studio attempts the configured extractions.

Endpoint matching supports:

| Pattern | Behavior |
| --- | --- |
| Exact path | `/api/v1/public/login` matches that path. |
| Path variables | `/orders/{orderId}` matches one path segment in place of `{orderId}`. |
| `*` wildcard | `*` is converted to a path matcher. |

For `BODY` extraction, the Studio reads JSON response bodies. Dot paths and array indexes are supported:

```text
data.access_token
items[0].id
```

For `HEADER` extraction, the Studio reads response headers with case-insensitive header lookup.

When a value is found, the Studio writes it into the matching environment variable. Non-string values are converted to strings; objects are converted with `JSON.stringify`.

## Storage Behavior

Environment value storage follows the Studio storage mode:

| Studio mode | Environment value behavior |
| --- | --- |
| `in-memory` | Values stay in the active UI state and are not persisted. |
| `indexed-db` | Values are stored in `sessionStorage` for the current browser tab session. They are not stored in IndexedDB. |

Automation definitions are persisted only when the Studio storage mode is `indexed-db`. Captured environment values are not stored in IndexedDB.

## Invalid Variables

Retreever ignores invalid environment variable entries during configuration initialization. Invalid entries are logged and omitted instead of breaking the whole application startup.

An entry is invalid when:

| Case |
| --- |
| `name` is blank. |
| Both `value` and `from` are configured. |
| Neither `value` nor `from` is configured. |
| `from.endpoints` has no usable endpoint. |
| `from.extract` has no usable extraction path. |
| An extraction source is not `BODY`, `HEADER`, `HEADERS`, or `HEADER/HEADERS`. |
