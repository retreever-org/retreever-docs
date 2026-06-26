---
title: Headers Metadata
---

# Headers Metadata

Headers are part of the API contract. Authentication tokens, tenant ids, idempotency keys, correlation ids, locale hints, and device identifiers often decide whether a request can be executed successfully.

Retreever resolves request header metadata from controller methods and optional `ApiHeader` beans.

## Header Sources

Retreever reads headers from these sources:

| Source | How it is declared |
| --- | --- |
| Mapping headers | Direct `@RequestMapping(headers = "...")` on a controller method. |
| Request header parameters | Method parameters annotated with `@RequestHeader`. |
| Endpoint header references | `@ApiEndpoint(headers = {...})`. |
| Header metadata beans | Spring beans of type `dev.retreever.endpoint.model.ApiHeader`. |

Use `@RequestHeader` metadata when the controller method already declares the header. Use reusable `ApiHeader` beans when the same header appears across many endpoints or when the header is referenced through `@ApiEndpoint(headers = {...})`.

## Register Reusable Header Metadata

Create `ApiHeader` beans when a header should have one shared definition across the API document.

Use `ApiHeader` beans for:

| Header pattern |
| --- |
| `Authorization` headers used by many secured endpoints. |
| Tenant, organization, or workspace headers repeated across controllers. |
| Idempotency, correlation, or request tracking headers. |
| Headers referenced by `@ApiEndpoint(headers = {...})` but not declared as method parameters. |

```java
import dev.retreever.endpoint.model.ApiHeader;
import dev.retreever.schema.model.JsonPropertyType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
class RetreeverHeaderMetadata {

    @Bean
    ApiHeader authorizationHeader() {
        return new ApiHeader()
                .setName(HttpHeaders.AUTHORIZATION)
                .setType(JsonPropertyType.STRING)
                .setRequired(true)
                .setDescription("Bearer token used to authorize the request.");
    }

    @Bean
    ApiHeader tenantHeader() {
        return new ApiHeader()
                .setName("X-Tenant-ID")
                .setType(JsonPropertyType.STRING)
                .setRequired(true)
                .setDescription("Tenant identifier for the request.");
    }
}
```

Reference the registered headers from an endpoint:

```java
import dev.retreever.annotation.ApiEndpoint;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;

@ApiEndpoint(headers = {HttpHeaders.AUTHORIZATION, "X-Tenant-ID"})
@GetMapping("/orders")
List<OrderResponse> listOrders() {
    return List.of();
}
```

If a name in `@ApiEndpoint(headers = {...})` has no matching `ApiHeader` bean, Retreever still creates header metadata with:

| Field | Value |
| --- | --- |
| `name` | The referenced header name |
| `type` | `JsonPropertyType.STRING` |
| `required` | `true` |

## Document `@RequestHeader` Parameters

Retreever reads name, required flag, Java type, and `@Description` from `@RequestHeader` parameters.

```java
import dev.retreever.annotation.Description;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@GetMapping("/orders")
List<OrderResponse> listOrders(
        @RequestHeader(name = "X-Tenant-ID", required = true)
        @Description("Tenant identifier for the request.")
        String tenantId
) {
    return List.of();
}
```

Use this option when the header is consumed directly by the controller method.

## Document Mapping Headers

Retreever reads headers declared directly on `@RequestMapping(headers = "...")`.

```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping(
        method = RequestMethod.GET,
        path = "/orders",
        headers = "X-Tenant-ID"
)
List<OrderResponse> listOrders() {
    return List.of();
}
```

Mapping headers are treated as required. Their type is resolved as `JsonPropertyType.STRING`.

## Merge Behavior

When the same header appears from multiple sources, Retreever merges it by header name. This allows you to combine method-level discovery with reusable metadata.

| Metadata | Priority |
| --- | --- |
| Description | Metadata from `@ApiEndpoint(headers = {...})` through an `ApiHeader` bean has priority. |
| Required flag | Mapping headers and `@RequestHeader` parameters have priority. |
| Type | The first resolved header entry initializes the type. |

## Header Type Values

`ApiHeader.setType(...)` accepts `JsonPropertyType`.

Common values:

| Type |
| --- |
| `JsonPropertyType.STRING` |
| `JsonPropertyType.NUMBER` |
| `JsonPropertyType.BOOLEAN` |
| `JsonPropertyType.UUID` |
| `JsonPropertyType.DATE` |
| `JsonPropertyType.DATE_TIME` |

The full enum is `dev.retreever.schema.model.JsonPropertyType`.
