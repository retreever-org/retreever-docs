---
title: Security
---

# Security

Retreever is embedded inside the host Spring Boot application. The host application decides which host APIs are protected and how users are authenticated for those APIs. Retreever can separately protect access to Retreever Studio and Retreever-owned resources.

## Protect Retreever Studio

Configure Retreever auth when Studio access should require a Retreever username and password.

```yaml
retreever:
  auth:
    username: admin
    password: change-me
    secret: 123e4567-e89b-12d3-a456-426614174000
```

Retreever auth is enabled only when both `retreever.auth.username` and `retreever.auth.password` are configured.

Set `retreever.auth.secret` to a stable UUID for environments where sessions should continue across application restarts or multiple application instances. If the secret is missing or invalid, Retreever generates a startup-only secret and existing Retreever login sessions are invalidated on restart.

## Allow Retreever Routes Through Host Security

When the host application uses Spring Security, the host security chain must allow Retreever routes to reach Retreever.

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

`RetreeverPublicPaths.get()` includes the Retreever Studio, assets, and runtime routes. Allowing these paths through the host security chain does not mean Retreever Studio is unprotected when Retreever auth is configured. It lets the request reach Retreever, where Retreever's own auth filter handles access to Retreever resources.

## Cookie Settings

Retreever auth cookies are `HttpOnly`, `SameSite=Lax`, scoped to the Retreever path, time-limited, and marked `Secure` by default.

The `retreever.auth.secure-cookies` property controls only the cookie `Secure` attribute. It is not a switch for Retreever authentication.

```yaml
retreever:
  auth:
    secure-cookies: false
```

Use `retreever.auth.secure-cookies=false` only when a local HTTP-only development setup does not retain the Retreever login session. Keep the default behavior for HTTPS and production-like environments.

## Disable Retreever When Needed

If an environment should not expose Retreever at all, disable Retreever explicitly.

```yaml
retreever:
  enabled: false
```

When disabled, Retreever does not register its controllers, filters, resources, or scanners.

## Host Application APIs

Retreever auth protects Retreever-owned routes and resources. It does not authenticate users for the host application's own APIs, and it does not replace the host application's security model.

This boundary is intentional. Retreever is an embedded API documentation and testing tool, so host API authorization, session handling, CSRF protection, roles, policies, and access rules remain owned by the host application.

## How Retreever Auth Works

When Retreever auth is enabled, login validates the configured username and password. On success, Retreever issues access and refresh cookies for Retreever routes.

Retreever auth tokens and login guard state are encrypted with `AES/GCM/NoPadding`. Retreever uses a random IV, a 128-bit GCM authentication tag, and an AES key derived from `retreever.auth.secret` with SHA-256. Access tokens default to 30 minutes and refresh tokens default to 7 days.

Logout clears Retreever auth cookies. Retreever applies this auth flow only to Retreever resources; the host application continues to control access to its own APIs.
