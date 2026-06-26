---
title: Studio Storage
---

# Studio Storage

Retreever Studio is a working API client as well as a documentation view. It can contain URLs, headers, request bodies, uploaded files, generated documentation, and environment values. Storage mode controls how much of that workspace data the browser may retain.

Retreever supports two storage modes:

| Mode | Use when |
| --- | --- |
| `in-memory` | The environment is shared, hosted, production-like, connected to sensitive systems, or may contain realistic customer/test data. |
| `indexed-db` | The environment is local, development, or test, and developers need request edits, generated docs, uploaded files, and workspace layout to survive reloads. |

`in-memory` is the default and the recommended setting for any environment where browser persistence is not explicitly safe. It keeps request URLs, bodies, response data, environment values, and authorization secrets out of long-lived Retreever workspace storage.

`indexed-db` stores more Studio workspace data in the browser. Use it only for trusted development and test environments.

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

## Recommended Usage

Use `in-memory` when:

| Condition |
| --- |
| The environment is staging, production-like, hosted, or shared. |
| API requests may include real or realistic customer data. |
| Request bodies, headers, uploaded files, or generated examples may contain sensitive values. |
| You want Retreever to avoid retaining manual request data after the active session. |

```yaml
retreever:
  studio:
    storage: in-memory
```

Use `indexed-db` when:

| Condition |
| --- |
| The environment is local, development, or test. |
| Developers are using test data and test credentials. |
| It is acceptable for the browser to retain request edits, generated documents, uploaded test files, and layout state. |
| Developers need to reload the Studio without rebuilding their workspace. |

```yaml
retreever:
  studio:
    storage: indexed-db
```

Do not enable `indexed-db` for production-like environments unless the team has explicitly reviewed the browser persistence risk.

## Browser State Outside Retreever

Retreever-managed workspace storage is not the only browser state involved in API testing.

Tested host APIs can still set browser cookies through `Set-Cookie`, and browsers or intermediaries can cache responses according to the host application's response headers, browser behavior, and request configuration. Retreever does not block tested API cookie flows because cookie-based flows are valid API testing behavior.

If an environment has strict data-handling requirements, review both Retreever storage mode and the host application's own browser-facing cookie and cache behavior.
