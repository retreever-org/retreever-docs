---
title: API Header Registory
---

# API Header Registry

HTTP headers are an important part of many APIs — authorization keys, device identifiers, tenant IDs, locale settings, request signatures, and more.
But unlike request bodies or path parameters, headers often repeat across dozens of endpoints.

Documenting them directly inside each endpoint quickly becomes:

* repetitive
* inconsistent
* error-prone
* and difficult to maintain

Retreever solves this with a **Header Registry**.

Instead of scattering header metadata across controllers, you declare them **once** as Spring beans.
Retreever picks them up automatically, enriches your documentation, and shows clear, reusable header definitions across the UI.

---

## Why a Header Registry?

### ✔ Avoids duplication

Headers like `Authorization`, `X-Device-ID`, or `X-Tenant-ID` are used everywhere.
Documenting them per endpoint is both tedious and inconsistent.

### ✔ Enables richer documentation

By registering headers:

* Retreever knows the header name
* its required/optional state
* its data type
* and its human-readable description

This leads to clearer API docs and fewer misunderstandings.

### ✔ Keeps controller code clean

Instead of bloating your annotations, headers remain a separate concern — just like exception handlers.

### ✔ Optional but highly recommended

Retreever works without header beans.
But adding them elevates your documentation quality significantly.

---

# How to Register API Headers

Create a Spring `@Configuration` class and define `ApiHeader` beans:

```java
package dev.retreever.example.config;

import dev.retreever.endpoint.model.ApiHeader;
import dev.retreever.schema.model.JsonPropertyType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class RetreeverHeaderRegistry {

    @Bean
    ApiHeader authHeader() {
        return new ApiHeader()
                .setName(HttpHeaders.AUTHORIZATION) // or any other header based on requirements
                .setRequired(true)
                .setType(JsonPropertyType.STRING)
                .setDescription("Authorization header for API requests");
    }

    @Bean
    ApiHeader deviceHeader() {
        return new ApiHeader()
                .setName("X-Device-ID") // or any other header based on requirements
                .setRequired(true)
                .setType(JsonPropertyType.STRING)
                .setDescription("Unique device identifier for the request");
    }
}
```

That’s it.

Retreever automatically adds these headers to the documentation wherever they are referenced in:

```java
@ApiEndpoint(
    headers = { HttpHeaders.AUTHORIZATION, "X-Device-ID" }
)
```

No duplication.
No extra metadata.
No mismatched descriptions.

---

# How Retreever Uses These Headers

When a header is declared in the registry:

* The UI displays it with full metadata
* It appears in the request editor with correct defaults
* The testing panel knows its type and requirement status
* Endpoint docs reference the shared definition instead of repeating details
* Teams maintain header definitions in **one** place

This aligns documentation and testing with your real API contract.

---

# When Should You Define a Header?

You *should* register a header when:

* It appears across multiple endpoints
* It is required for auth or session management
* It is important for client tracking (device ID, tenant ID, locale, etc.)
* It has a specific type or description
* It is non-standard or custom

You *don’t need* to register one-off headers used in isolated cases, though you still can.

---

# Summary

Retreever’s header registry keeps your API docs:

* consistent
* accurate
* reusable
* and easy to maintain

Define headers once.
Use them everywhere.
Let Retreever handle the rest.
