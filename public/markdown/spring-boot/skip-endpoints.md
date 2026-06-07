---
title: Skip Endpoints
---

# Skip Endpoints

Use this only when some host application endpoints should not appear in the generated Retreever document.

## Skip With Annotation

Use `@RetreeverSkip` on a controller or controller method:

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

## Skip With Configuration

Or configure path exclusions:

```yaml
retreever:
  docs:
    skip:
      - /internal/reindex
      - /users/{userId}
      - /admin/**
      - regex:^/reports/[0-9]+/export$
```

`retreever.docs.skip` accepts exact paths, Ant-style patterns, and entries prefixed with `regex:`.
