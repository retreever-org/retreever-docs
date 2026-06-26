---
title: Annotations
---

# Annotations

Retreever derives the first version of the document from Spring controllers, request mappings, method parameters, request and response types, validation annotations, Jackson metadata, and exception handlers.

Annotations are optional. Add them when the generated document needs information that the code cannot express clearly enough: names, descriptions, examples, explicit success statuses, reusable headers, or mapped error cases.

All Retreever annotations are runtime annotations.

## Summary

| Annotation | Target | Purpose |
| --- | --- | --- |
| `@ApiDoc` | Type | Sets top-level API document name, description, and version. |
| `@ApiGroup` | Type | Sets controller group name and description. |
| `@ApiEndpoint` | Method | Sets endpoint name, security flag, status, headers, description, and mapped error types. |
| `@ApiError` | Method | Sets documented status and description for an exception handler. |
| `@FieldInfo` | Field | Sets schema field description and example. |
| `@Description` | Parameter, field | Sets human-readable descriptions for parameters or fields. |
| `@RetreeverSkip` | Type, method | Excludes a controller or endpoint from Retreever documentation. |

## `@ApiDoc`

`@ApiDoc` gives the generated document an explicit product or service identity.

Add `@ApiDoc` when the document should show a deliberate API name, description, or version. Without it, Retreever derives the document name from the application class and uses version `v1`.

```java
import dev.retreever.annotation.ApiDoc;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@ApiDoc(
        name = "Order API",
        description = "APIs for order management",
        version = "v1"
)
@SpringBootApplication
class OrderApplication {
}
```

Fields:

| Field | Required | Default |
| --- | --- | --- |
| `name` | Yes | None |
| `description` | No | Empty string |
| `version` | No | `v1` |

## `@ApiGroup`

`@ApiGroup` gives a Spring controller a readable group name instead of a controller-derived fallback.

Add `@ApiGroup` when controller class names are implementation-oriented, split for code organization, or not the wording developers should see in the Studio sidebar.

```java
import dev.retreever.annotation.ApiGroup;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiGroup(
        name = "Orders",
        description = "Create, search, and manage customer orders."
)
@RestController
@RequestMapping("/orders")
class OrderController {
}
```

Fields:

| Field | Required | Default |
| --- | --- | --- |
| `name` | Yes | None |
| `description` | No | Empty string |

If `@ApiGroup` is not present, Retreever derives a group name from the controller class name.

## `@ApiEndpoint`

Add `@ApiEndpoint` when method-name inference is not enough.

It provides a readable endpoint name, documented success status, security marker, endpoint description, reusable header references, and mapped error types.

```java
import dev.retreever.annotation.ApiEndpoint;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@ApiEndpoint(
        name = "Find Order",
        secured = true,
        status = HttpStatus.OK,
        headers = {HttpHeaders.AUTHORIZATION, "X-Tenant-ID"},
        description = "Returns one order by id.",
        errors = {OrderNotFoundException.class}
)
@GetMapping("/{orderId}")
OrderResponse findOrder(@PathVariable String orderId) {
    return null;
}
```

Fields:

| Field | Required | Default |
| --- | --- | --- |
| `name` | No | Method name converted to readable text. |
| `secured` | No | `false` |
| `status` | No | `HttpStatus.OK` |
| `headers` | No | Empty array |
| `description` | No | Empty string |
| `errors` | No | Empty array |

Retreever also marks an endpoint as secured when supported Spring Security annotations are present on the method or controller.

Supported security annotations:

| Annotation |
| --- |
| `@PreAuthorize` |
| `@PostAuthorize` |
| `@Secured` |
| `jakarta.annotation.security.RolesAllowed` |
| `javax.annotation.security.RolesAllowed` |

`permitAll()` and `isAnonymous()` expressions are treated as public. If an expression combines a public condition with an `or` operator, Retreever treats the endpoint as public for documentation purposes.

## `@ApiError`

`@ApiError` documents the status and meaning of an error response handled by an `@ExceptionHandler` method.

Retreever scans exception handlers and links errors to endpoints when endpoint metadata references the exception type through `@ApiEndpoint(errors = {...})`.

```java
import dev.retreever.annotation.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class ApiExceptionHandler {

    @ApiError(
            status = HttpStatus.NOT_FOUND,
            description = "Order was not found."
    )
    @ExceptionHandler(OrderNotFoundException.class)
    ErrorResponse handleOrderNotFound(OrderNotFoundException ex) {
        return new ErrorResponse("ORDER_NOT_FOUND");
    }
}
```

Fields:

| Field | Required | Default |
| --- | --- | --- |
| `status` | Yes | None |
| `description` | No | Empty string |

If `@ApiError` is not present on an exception handler, Retreever uses `HttpStatus.INTERNAL_SERVER_ERROR` and an empty description.

## `@FieldInfo`

`@FieldInfo` adds schema descriptions and examples directly on DTO fields.

Add `@FieldInfo` when the field meaning is not obvious from the Java name alone, such as external ids, status values, timestamps, or domain-specific codes.

```java
import dev.retreever.annotation.FieldInfo;
import jakarta.validation.constraints.NotBlank;

class OrderResponse {

    @NotBlank
    @FieldInfo(
            description = "Public order identifier.",
            example = "ORD-1001"
    )
    private String orderId;
}
```

Fields:

| Field | Required | Default |
| --- | --- | --- |
| `description` | No | Empty string |
| `example` | No | Empty string |

Retreever reads `@FieldInfo.description()` when no `@Description` is present on the field. It reads `@FieldInfo.example()` when the example value is not blank.

## `@Description`

`@Description` adds concise human-readable explanations to fields and method parameters.

Add `@Description` to request parameters when the Studio needs to explain what a path variable, query parameter, or header means without introducing additional wrapper types.

```java
import dev.retreever.annotation.Description;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

OrderResponse findOrder(
        @PathVariable
        @Description("Public order identifier.")
        String orderId,

        @RequestParam
        @Description("Optional customer id filter.")
        String customerId,

        @RequestHeader("X-Tenant-ID")
        @Description("Tenant identifier for the request.")
        String tenantId
) {
    return null;
}
```

`@Description` has one required field: `value`.

For schema fields, `@Description` has priority over `@FieldInfo.description()`.

## `@RetreeverSkip`

`@RetreeverSkip` excludes a controller class or controller method from the generated Retreever document.

This is a documentation exclusion only. It does not disable the endpoint and does not change host application security.

```java
import dev.retreever.annotation.RetreeverSkip;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RetreeverSkip
@RestController
@RequestMapping("/internal")
class InternalController {

    @DeleteMapping("/cache")
    void clearCache() {
    }
}
```

When placed on a controller, the controller is not included in Retreever documentation. When placed on a method, only that endpoint is excluded.

For centralized path-based exclusions, use `retreever.docs.skip`. See [Skip Endpoints](/spring-boot/skip-endpoints).

## Validation And Jackson Metadata

Retreever also reads metadata from common framework annotations, so you do not need Retreever-specific annotations for everything.

Validation constraints from fields and parameters:

| Validation annotation | Documented constraint |
| --- | --- |
| `@NotNull` | Required value |
| `@NotBlank` | Required non-blank value |
| `@NotEmpty` | Required non-empty value |
| `@Size` | Minimum and maximum length when configured |
| `@Min` | Minimum numeric value |
| `@Max` | Maximum numeric value |
| `@Pattern` | Regex pattern |

Both `jakarta.validation.constraints.*` and `javax.validation.constraints.*` variants are supported.

Retreever also uses Jackson naming metadata while resolving schema property names. It checks Jackson's serialization model, `@JsonProperty`, and class-level `@JsonNaming`.
