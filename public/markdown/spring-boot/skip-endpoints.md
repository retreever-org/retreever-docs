---
title: Skip Endpoints
---

# Skip Endpoints

Generated documentation should show the API surface developers are meant to discover and test. Some Spring MVC endpoints are internal, operational, or sensitive, and should stay out of the Retreever document.

Skip endpoints when they should not appear in the generated Retreever document even though they still exist in the Spring application.

Typical examples include:

| Endpoint type | Why you might skip it |
| --- | --- |
| Internal maintenance endpoints | They are not part of the public or partner API contract. |
| Admin or break-glass operations | They can be high-risk even in test environments. |
| Migration, reindex, or repair endpoints | They are operational controls rather than API features. |
| Sensitive compliance surfaces | They should not appear in generated documentation. |

Skipping affects only Retreever documentation. It does not remove the endpoint from Spring MVC and does not change the host application's security behavior.

## Skip With Annotation

Use `@RetreeverSkip` when the endpoint or controller should be hidden in every environment. This keeps the exclusion close to the controller code and makes the rule visible during code review.

```java
import dev.retreever.annotation.RetreeverSkip;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
class InternalController {

    @RetreeverSkip
    @GetMapping("/reindex")
    void reindex() {
    }
}
```

Place `@RetreeverSkip` on a controller class to skip every endpoint in that controller:

```java
import dev.retreever.annotation.RetreeverSkip;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RetreeverSkip
@RestController
@RequestMapping("/operations")
class OperationsController {

    @DeleteMapping("/cache")
    void clearCache() {
    }
}
```

## Skip With Configuration

Use `retreever.docs.skip` when the exclusion should be controlled outside the controller source.

Use configuration-based skipping when:

| Condition |
| --- |
| Different environments should hide different endpoints. |
| A platform or compliance team owns documentation exclusions centrally. |
| The endpoint source should not be changed only for documentation policy. |
| A broad path family such as `/admin/**` must be excluded. |

```yaml
retreever:
  docs:
    skip:
      - /internal/reindex
      - /users/{userId}
      - /admin/**
      - regex:^/reports/[0-9]+/export$
```

`retreever.docs.skip` supports:

| Pattern type | Example | Behavior |
| --- | --- | --- |
| Exact path | `/internal/reindex` | Matches the resolved endpoint path exactly. |
| Ant-style pattern | `/admin/**` | Uses Spring's `AntPathMatcher`. |
| Path-template style pattern | `/users/{userId}` | Works as an Ant-style pattern against the resolved endpoint path. |
| Regex | `regex:^/reports/[0-9]+/export$` | Matches the resolved endpoint path with Java regex. |

Configured paths are normalized with a leading `/`, repeated slashes are collapsed, and trailing slashes are ignored except for the root path.

## Choosing Annotation Or Configuration

| Use | When |
| --- | --- |
| `@RetreeverSkip` | The endpoint should always be hidden wherever the application runs. |
| `retreever.docs.skip` | The exclusion is deployment-specific, policy-driven, or managed outside the controller source. |

If both are present, the result is the same: the endpoint is not included in the generated Retreever document.
