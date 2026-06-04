---
title: Annotations
---

# Annotations

Retreever works without Retreever annotations. The annotations below add metadata to the generated document.

All Retreever annotations are runtime annotations.

---

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

---

## 1. @ApiDoc

`@ApiDoc` annotation can be used on the Spring Boot application class for defining the top-level API document identity. It allows the generated document to present a specific API name, description, and version instead of relying on derived defaults.

Use `@ApiDoc` on the Spring Boot application class.

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

If `@ApiDoc` is not present, Retreever derives the document name from the application class name and uses version `v1`.

---

## 2. @ApiGroup

`@ApiGroup` annotation can be used on a Spring controller for defining how that controller is grouped in the generated document. It helps present endpoints under a deliberate business-facing group name and description instead of only using the controller-derived fallback.

Use `@ApiGroup` on a Spring controller.

```java
import dev.retreever.annotation.ApiGroup;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiGroup(
        name = "Orders",
        description = "Order APIs"
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

---

## 3. @ApiEndpoint

`@ApiEndpoint` annotation can be used on a controller method for enriching endpoint-level documentation metadata. It allows the endpoint to expose a clearer display name, an explicit secured marker, a documented success status, reusable headers, descriptive text, and linked error types.

Use `@ApiEndpoint` on a controller method.

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
        description = "Returns one order by id",
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

`permitAll()` and `isAnonymous()` expressions are treated as public.

---

## 4. @ApiError

`@ApiError` annotation can be used on an `@ExceptionHandler` method for documenting the error response contract handled by that method. It enables the generated document to show a specific response status and error description for consumers.

Use `@ApiError` on an `@ExceptionHandler` method.

```java
import dev.retreever.annotation.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class ApiExceptionHandler {

    @ApiError(
            status = HttpStatus.NOT_FOUND,
            description = "Order was not found"
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

---

## 5. @FieldInfo

`@FieldInfo` annotation can be used on DTO fields for enriching schema property documentation. It helps provide a clearer field description and a concrete example value in the generated model output.

Use `@FieldInfo` on DTO fields.

```java
import dev.retreever.annotation.FieldInfo;
import jakarta.validation.constraints.NotBlank;

class OrderResponse {

    @NotBlank
    @FieldInfo(
            description = "Public order identifier",
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

---

## 6. @Description

`@Description` annotation can be used on fields and method parameters for attaching human-readable explanatory text. It enhances generated request and schema documentation for fields, path variables, query parameters, and request headers.

Use `@Description` on fields or method parameters.

```java
import dev.retreever.annotation.Description;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

OrderResponse findOrder(
        @PathVariable
        @Description("Public order identifier")
        String orderId,

        @RequestParam
        @Description("Optional customer id filter")
        String customerId,

        @RequestHeader("X-Tenant-ID")
        @Description("Tenant identifier")
        String tenantId
) {
    return null;
}
```

`@Description` has one required field: `value`.

For schema fields, `@Description` has priority over `@FieldInfo.description()`.

---

## 7. @RetreeverSkip

`@RetreeverSkip` annotation can be used on a controller class or controller method for excluding that runtime surface from the generated Retreever document. It allows internal, admin, or otherwise non-public endpoints to stay out of the published documentation.

Use `@RetreeverSkip` on a controller class or controller method.

```java
import dev.retreever.annotation.RetreeverSkip;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
@RetreeverSkip
class InternalController {

    @DeleteMapping("/cache")
    void clearCache() {
    }
}
```

When placed on a controller, the controller is not included in Retreever documentation. When placed on a method, that endpoint is not included.

--- 

## Validation And Jackson Metadata

Retreever reads these validation constraints from fields and parameters:

| Validation annotation | Documented constraint |
| --- | --- |
| `@NotNull` | Required value |
| `@NotBlank` | Required non-blank value |
| `@NotEmpty` | Required non-empty value |
| `@Size` | Minimum and maximum length when configured |
| `@Min` | Minimum numeric value |
| `@Max` | Maximum numeric value |
| `@Pattern` | Regex pattern |

Retreever also uses Jackson naming metadata while resolving schema property names. It checks Jackson's serialization model, `@JsonProperty`, and class-level `@JsonNaming`.
