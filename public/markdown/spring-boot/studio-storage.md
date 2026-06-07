---
title: Studio Storage
---

# Studio Storage

Retreever Studio supports two storage modes:

- `in-memory`
- `indexed-db`

`in-memory` is the default. It keeps sensitive working data runtime-scoped where possible and is the expected posture for production-like environments.

`indexed-db` enables persistent workspace behavior for local, development, and test environments where users are trusted and the data is appropriate for browser persistence.

Configure the mode with:

```yaml
retreever:
  studio:
    storage: in-memory
```

Any blank or unsupported value falls back to `in-memory`.

## Storage Matrix

| Data category | `in-memory` | `indexed-db` | Notes |
| --- | --- | --- | --- |
| Active tab order and view state | Persisted without manual request URLs | Persisted | Retreever keeps low-risk continuity data such as tab identity, active tab, selected HTTP method, and active request input view. |
| Generated Retreever document | Not persisted | Persisted | Intended for authorized Studio users. Do not place secrets or real customer data in generated examples. |
| Request URL/header/param/body edits | Not persisted | Persisted | Can contain sensitive test data. Enable only in trusted environments. |
| API responses | Not persisted by Retreever | Not persisted by Retreever | Retreever does not persist response body, headers, status, timing, or displayed cookie/header data. |
| Environment key-values | Not persisted | Session-scoped | Never stored in IndexedDB or localStorage. Runtime-readable while Studio is open. |
| Environment automation definitions | Not persisted | Persisted | Declarative extraction rules only. No JavaScript execution model. |
| Uploaded request files | Not persisted | Persisted | Treat uploaded files as potentially sensitive test inputs. |
| Global Authorization settings | Session-scoped | Session-scoped | Stored in `sessionStorage` only. Prefer environment placeholders such as `{{token}}` instead of raw secret values. |
| Retreever auth tokens | HttpOnly cookies | HttpOnly cookies | Not copied into JavaScript-accessible browser storage. |

Active tab metadata is intentionally separated from request data. In `in-memory` mode, Retreever can preserve view continuity while removing manual request URLs, request bodies, response bodies, environment values, and authorization secrets from retained tab data.

Browser-managed state is separate from Retreever-managed workspace storage. Tested host APIs can still set browser cookies through `Set-Cookie`, and browsers or intermediaries can cache responses according to the host application's response headers, browser behavior, and request configuration. Retreever does not block tested API cookie flows because cookie-based flows are valid API testing behavior.

## Recommended Usage

Use `in-memory` where the environment resembles production, uses realistic data, or connects to sensitive downstream systems.

```yaml
retreever:
  studio:
    storage: in-memory
```

Use `indexed-db` where persistent workspace behavior is useful and the environment is local, development, or test.

```yaml
retreever:
  studio:
    storage: indexed-db
```

Use test data and test credentials when browser persistence is enabled.
