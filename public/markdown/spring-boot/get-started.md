---
title: Get Started
---

# Get Started

Retreever is an embedded API documentation and testing workspace for Spring Boot applications. It uses the application code as the source of truth, so the documentation stays aligned with the controllers, DTOs, validation rules, headers, and exception handlers that are actually running.

This removes the usual split between implementation, static API docs, and a separate request-testing collection. Start the application, open `/retreever`, and the Studio shows the discovered API surface with request inputs, response models, and browser-based testing.

Retreever resolves:

| Area | What is discovered |
| --- | --- |
| Endpoints | `@RestController` mappings, HTTP methods, paths, path variables, query parameters, and headers. |
| Schemas | Request bodies, response bodies, records, nested DTOs, arrays, maps, and generic types. |
| Rules | Jakarta and Javax validation constraints, Jackson property names, and supported security annotations. |
| Errors | `@RestControllerAdvice`, `@ExceptionHandler`, and optional mapped error metadata. |
| Testing context | Environment variables, reusable headers, Retreever auth state, and browser-based request execution. |

Supported runtime:

| Requirement | Version |
| --- | --- |
| Java | 17 or later |
| Spring Boot | 3.x and 4.x |

## Step 1: Add Retreever

Add Retreever to the application that owns the APIs you want to document and test.

**Maven**

```xml
<dependency>
    <groupId>dev.retreever</groupId>
    <artifactId>retreever</artifactId>
    <version>2.0.0</version>
</dependency>
```

**Gradle**

```gradle
implementation("dev.retreever:retreever:2.0.0")
```

No Retreever annotations or YAML configuration are required for the first run. Add metadata later only where the generated document needs clearer names, descriptions, examples, or error details.

## Step 2: Start Your Application

Run your Spring Boot application the same way you normally do:

**Maven**

```bash
./mvnw spring-boot:run
```

**Gradle**

```bash
./gradlew bootRun
```

Retreever is enabled by default. During startup, it scans eligible Spring MVC controllers and prepares the generated API document used by the Studio.

## Step 3: Allow Retreever Routes Through Spring Security

Skip this step if the host application does not use Spring Security.

If Spring Security is present, the host application's security chain must allow Retreever routes to reach Retreever. This does not decide who can use the Studio; it only prevents the host security chain from blocking Retreever before Retreever can apply its own optional authentication.

```java
import dev.retreever.config.RetreeverPublicPaths;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(RetreeverPublicPaths.get()).permitAll()
                    .anyRequest().authenticated()
            )
            .build();
}
```

`RetreeverPublicPaths.get()` includes `/retreever` and `/retreever/**`.

## Step 4: Open Retreever Studio

Open the Studio from the same host and port as your application:

```text
http://localhost:8080/retreever
```

If your application runs on a different port or context path, use that host application URL instead.

## What To Do Next

After the Studio opens, add metadata only where the generated document needs more context:

| Goal | Read |
| --- | --- |
| Add names, descriptions, examples, or error mappings | [Annotations](/spring-boot/annotations) |
| Protect Retreever Studio access | [Security](/spring-boot/security) |
| Preload tokens, tenant ids, or other test values | [Environment Automation](/spring-boot/environment-automation) |
| Hide internal or operational endpoints | [Skip Endpoints](/spring-boot/skip-endpoints) |

If Retreever works locally but fails behind a proxy, gateway, ingress, or load balancer, review [Retreever in Proxy and Load-Balancer Deployments](/spring-boot/__forwarded_header_strategy_issue).
