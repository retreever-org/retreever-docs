---
title: Environment Automation
---

# Environment Automation

Retreever can send environment variables to the Studio through `GET /retreever/environment`.

The UI uses environment variables in request URLs, query parameters, headers, authorization fields, and request bodies with this placeholder format:

```text
{{variableName}}
```

## Static Variables

Use `retreever.env.variable` for one static variable.

```yaml
retreever:
  env:
    variable:
      name: device-id
      value: device-web-001
```

Use `retreever.env.variables` for a list.

```yaml
retreever:
  env:
    variables:
      - name: tenant-id
        value: tenant-demo
      - name: locale
        value: en-US
```

Static variables are returned with `name` and `value`.

## Automated Variables

Use `from.endpoints` and `from.extract` when a variable should be resolved from an API response.

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
| `from.endpoints` | Yes | One or more endpoints. String form is `[METHOD] /uri`. |
| `from.extract` | Yes | One or more extraction paths. String form is `[BODY] path` or `[HEADER] path`. |

Retreever normalizes endpoint methods to uppercase. Endpoint URIs are normalized with a leading `/`.

Extraction source values are normalized to `BODY` or `HEADER`. `HEADERS` is also normalized to `HEADER`.

## Object Form

The same automation can be written with object values.

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

## How The UI Resolves Values

After a request completes, the UI checks automation rules against the request method and path.

Endpoint matching supports:

| Pattern | Behavior |
| --- | --- |
| Exact path | `/api/v1/public/login` matches that path. |
| Path variables | `/orders/{orderId}` matches one path segment in place of `{orderId}`. |
| `*` wildcard | `*` is converted to a path matcher. |

For `BODY` extraction, the UI reads JSON response bodies. Dot paths and array indexes are supported.

```text
data.access_token
items[0].id
```

For `HEADER` extraction, the UI reads response headers. Property lookup is case-insensitive.

When a value is found, the UI writes it into the matching environment variable. Non-string values are converted to strings; objects are converted with `JSON.stringify`.

## Storage Behavior

Environment value storage follows the Studio storage mode:

| Studio mode | Environment value behavior |
| --- | --- |
| `in-memory` | Values stay in the active UI state and are not persisted. |
| `indexed-db` | Values are stored in `sessionStorage` for the current browser tab session. They are not stored in IndexedDB. |

Automation definitions may be persisted only when the Studio storage mode is `indexed-db`.

## Invalid Variables

Retreever ignores invalid environment variable entries during configuration initialization.

An entry is invalid when:

| Case |
| --- |
| `name` is blank. |
| Both `value` and `from` are configured. |
| Neither `value` nor `from` is configured. |
| `from.endpoints` has no usable endpoint. |
| `from.extract` has no usable extraction path. |
| An extraction source is not `BODY`, `HEADER`, or `HEADERS`. |
