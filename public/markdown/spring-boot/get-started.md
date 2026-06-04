---
title: Get Started
---

# Get Started

Retreever is a Spring Boot library. Add it to a Spring Boot 3.x application, start the app, and open the Studio at `/retreever`.

You need Java 17 or later.

## Step 1: Add Retreever

Add the dependency to your Spring Boot application.

**Maven**

```xml
<dependency>
    <groupId>dev.retreever</groupId>
    <artifactId>retreever</artifactId>
    <version>1.1.1</version>
</dependency>
```

**Gradle**

```gradle
implementation("dev.retreever:retreever:1.1.1")
```

No Retreever annotations or YAML configuration are required for the basic setup.

## Step 2: Start Your Application

Run your Spring Boot application the same way you normally do.

For Maven:

```bash
./mvnw spring-boot:run
```

For Gradle:

```bash
./gradlew bootRun
```

Retreever is enabled by default. During startup, it scans the host application's controllers and exposes the Studio routes.

## Step 3: Allow Retreever Routes Through Spring Security (Host-Dependent)

Host-dependent step: this is required only when the host application uses Spring Security.

The host application's security chain must allow Retreever routes. Retreever auth, when configured, runs after those routes are allowed by the host application.

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

`RetreeverPublicPaths.get()` includes `/retreever`, `/retreever/**`, `/assets/**`, `/images/**`, `/index.html`, and `/favicon.ico`.

If the host application does not use Spring Security, skip this step.

## Step 4: Open Retreever Studio

Open the Studio in your browser:

```text
http://localhost:8080/retreever
```

If your application runs on a different port or context path, use that host application URL instead.

## Optional Security: Protect Retreever Studio With Retreever Auth

Retreever auth is optional. Configure it only when you want Retreever Studio to require its own login.

Retreever auth is enabled only when both `username` and `password` are configured.

```yaml
retreever:
  auth:
    username: admin
    password: change-me
    secret: 123e4567-e89b-12d3-a456-426614174000
```

Auth properties:

| Property | Behavior |
| --- | --- |
| `retreever.auth.username` | Required with `password` to enable Retreever auth. |
| `retreever.auth.password` | Required with `username` to enable Retreever auth. |
| `retreever.auth.secret` | Optional UUID. When present and valid, it is used to derive the encryption key for Retreever auth tokens and login guard state. |
| `retreever.auth.secure-cookies` | Controls the `Secure` attribute on Retreever auth cookies. Defaults to `true`. |
| `retreever.auth.access-token-ttl` | Access token duration. Defaults to 30 minutes. |
| `retreever.auth.refresh-token-ttl` | Refresh token duration. Defaults to 7 days. |

If only one of username or password is configured, Retreever disables its auth configuration.

If `secret` is missing or invalid, Retreever generates a startup-only secret.

Auth cookies are `HttpOnly`, `SameSite=Lax`, scoped to the Retreever path, and use the cookie names `retreever_at`, `retreever_rt`, and `retreever_did`.

In case a local HTTP-only development setup does not retain the Retreever login session, use `retreever.auth.secure-cookies=false` temporarily for that local setup only.

Failed login attempts are tracked in the encrypted `retreever_lg` cookie. Every fifth failed attempt triggers a lockout. The lockout durations are 30 seconds, 5 minutes, 30 minutes, and then 1 hour for later cycles.

## Optional Enhancement: Configure Studio Storage

Retreever Studio storage is optional. The default is `in-memory`, which is enough for trying Retreever and for environments where Studio data should not persist.

```yaml
retreever:
  studio:
    storage: in-memory
```

Supported values:

| Value | Behavior in the UI |
| --- | --- |
| `in-memory` | Default. Generated docs, request edits, environment automation definitions, uploaded files, global authorization settings, and environment values are not persisted by the guarded Studio storage layer. |
| `indexed-db` | Enables persistent Studio workspace data. The UI may persist docs, request edits, uploaded files, automation definitions, global authorization settings, and tab document state. Environment values are stored in `sessionStorage`, not IndexedDB. |

Tab order is stored separately by the UI.

Any blank or unsupported value falls back to `in-memory`.

## Optional Documentation Control: Exclude Endpoints From Retreever Docs

Use this only when some host application endpoints should not appear in the generated Retreever document.

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

## Runtime Endpoint Reference

Retreever exposes its runtime endpoints under `/retreever`.

You do not need to call these endpoints directly to use the Studio. They are listed here for integration, troubleshooting, and automation use cases.

| Endpoint | Purpose |
| --- | --- |
| `GET /retreever/ping` | Returns Retreever availability and uptime. |
| `GET /retreever/doc` | Returns the generated API document. |
| `GET /retreever/environment` | Returns configured environment variables and automation rules. |
| `POST /retreever/login` | Logs in when Retreever auth is enabled. |
| `POST /retreever/refresh` | Refreshes Retreever auth cookies. |
| `POST /retreever/logout` | Clears Retreever auth cookies. |

Retreever applies these browser security headers only to `/retreever` routes:

| Header | Value source |
| --- | --- |
| `Content-Security-Policy` | `RetreeverSecurityHeadersFilter.CONTENT_SECURITY_POLICY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Camera, microphone, geolocation, payment, USB, serial, Bluetooth, and clipboard-read are disabled. |

## Disable Retreever

Disable Retreever only when the host application should not register Retreever controllers, filters, resources, or scanners.

```yaml
retreever:
  enabled: false
```

When disabled, the auto-configuration does not register Retreever at runtime.
