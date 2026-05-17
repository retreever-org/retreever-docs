---
title: Headers Metadata
---

# Headers Metadata

Retreever resolves request header metadata from controller methods and optional `ApiHeader` beans.

## Header Sources

Retreever reads headers from these sources:

| Source | How it is declared |
| --- | --- |
| Mapping headers | Direct `@RequestMapping(headers = "...")` on a controller method. |
| Request header parameters | Method parameters annotated with `@RequestHeader`. |
| Endpoint header references | `@ApiEndpoint(headers = {...})`. |
| Header metadata beans | Spring beans of type `dev.retreever.endpoint.model.ApiHeader`. |

## Register Reusable Header Metadata

Create `ApiHeader` beans when you want reusable metadata for headers referenced by `@ApiEndpoint(headers = {...})`.

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
                .setDescription("Authorization header");
    }

    @Bean
    ApiHeader tenantHeader() {
        return new ApiHeader()
                .setName("X-Tenant-ID")
                .setType(JsonPropertyType.STRING)
                .setRequired(true)
                .setDescription("Tenant identifier");
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
        @Description("Tenant identifier")
        String tenantId
) {
    return List.of();
}
```

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

When the same header appears from multiple sources, Retreever merges it by header name.

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
