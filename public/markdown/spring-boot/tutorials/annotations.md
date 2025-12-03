---
title: Annotations
---

# Retreever Annotations

Retreever is designed to eliminate annotation overload.
But it also gives you **lightweight, optional annotations** to enrich your documentation where it actually matters — names, descriptions, examples, constraints, and errors.

This page shows how Retreever compares to traditional Swagger/OpenAPI annotations and how its annotation model scales cleanly without duplication.

---

## The Problem With Swagger / OpenAPI Annotations

A single endpoint with a request body, response schema, headers, and error responses typically ends up looking like this:

```java
@Operation(
    summary = "Fetch user by ID",
    description = "Returns user details for the given ID."
)
@ApiResponses({
    @ApiResponse(
        responseCode = "200",
        description = "User found",
        content = @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = UserResponse.class)
        )
    ),
    @ApiResponse(
        responseCode = "404",
        description = "User not found",
        content = @Content(
            schema = @Schema(implementation = ErrorResponse.class)
        )
    ),
    @ApiResponse(
        responseCode = "400",
        description = "Invalid request body",
        content = @Content(
            schema = @Schema(implementation = ValidationError.class)
        )
    )
})
@Parameter(
    name = "id",
    description = "Primary key of the user",
    required = true
)
@GetMapping("/users/{id}")
public ResponseEntity<UserResponse> getUser(@PathVariable UUID id) { ... }
```

This is **20–40 lines** of duplicated metadata:

* describing DTOs that already exist in code
* specifying exceptions that already map to handlers
* repeating path variable names
* maintaining manually synced response codes

If your API has 50–100 endpoints, this becomes unmanageable.

---

# Retreever's Approach: Minimal, Intentional, Optional

Retreever **does not require annotations** to work.
Your controllers, DTOs, validation constraints, and exception handlers are already enough to generate full documentation.

Annotations become optional enhancements — used only when you want to add clarity, not because the tool *needs* them.

---

## `@ApiEndpoint` — Enrich Endpoint Metadata

Here’s the equivalent of the Swagger example above, using Retreever:

```java
@ApiEndpoint(
    secured = true,
    status = HttpStatus.OK,
    description = "Fetch User",
    headers = { HttpHeaders.AUTHORIZATION },
    errors = {
        UserNotFoundException.class,
        MethodArgumentNotValidException.class
    }
)
@GetMapping("/users/{userId}")
public ResponseEntity<UserResponse> getUser(
        @Valid
        @PathVariable
        @Description("Id / Primary Key of the user")
        UUID userId
) { ... }
```

### What Retreever extracts automatically:

* HTTP method
* Path (`/users/{userId}`)
* Path variables and query params
* Media types
* Actual return type (`UserResponse`)
* Validation constraints
* DTO schema and examples

### What the annotation adds (optional):

* human-readable name
* human-readable description
* authorization header requirement
* explicit error types
* explicit success status

Compared to Swagger, there is **ZERO duplication** of schema info, no boilerplate, and no multi-line blocks of metadata.

---

## `@ApiError` — Map Exception Handlers Into Documentation

Swagger requires manually documenting every error code at the endpoint level.
SpringDoc handles some default cases but still needs metadata duplication.

Retreever uses your existing exception handlers:

```java
@ApiError(
    status = HttpStatus.NOT_FOUND,
    description = "User not found by ID"
)
@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<ApiErrorResponse> handleUserNotFound(
        UserNotFoundException ex
) { ... }
```

This eliminates duplication:

* No need to specify error responses on every endpoint
* No manually assigning status codes
* No repeating descriptions

Any endpoint that throws this exception **automatically** gets the documented error.

---

## `@ApiGroup` — Organize Controllers

Groups give structure to your UI:

```java
@ApiGroup(
    name = "User APIs",
    description = "Collection of all APIs operating over User model"
)
@RestController
@RequestMapping("/users")
public class UserController { ... }
```

This tells Retreever:

* how to name the group in the sidebar
* how to present grouped endpoints
* how to structure documentation cleanly

No YAML sectioning, no separate config files.

---

## `@FieldInfo` — Describe DTO Fields Cleanly

DTO enrichment stays close to your actual data shape:

```java
public record UserResponse(
    @FieldInfo(
        example = "John Doe",
        description = "Name of the user"
    )
    String name
) {}
```

This adds:

* example values
* human-readable descriptions
* clearer JSON schemas
* auto-generated examples in the UI

Retreever still reads validation annotations (e.g., `@NotBlank`, `@Size`, etc.), so you get **full constraint visibility**.

---

## `@Description` — Document Parameters Without Noise

Instead of the heavy Swagger `@Parameter` annotation:

```java
public ResponseEntity<UserResponse> getUser(
    @Valid
    @PathVariable
    @Description("Id / Primary Key of the user")
    UUID userId
) { ... }
```

This keeps signature clean while improving documentation clarity.

---

## Scales Better Than Swagger / OpenAPI

1. You write annotations **only when they add value**, not because the framework demands it.
2. Your code defines your API — Retreever extracts everything else.
3. Error mapping happens once, not on every endpoint.
4. Examples and schemas stay in sync with your models.
5. Documentation never drifts or duplicates metadata.
6. The UI becomes a live reflection of your actual application.

Retreever annotations are an additive enhancement layer — not a documentation burden.

