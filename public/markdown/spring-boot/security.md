---
## title: Security
---

# Security

Retreever Studio exposes runtime-generated API documentation and enables API testing from the browser. When Retreever is enabled in a shared, hosted, staging, production-like, or sensitive environment, Studio access should be protected to avoid anonymous access to API specs and API execution.

Retreever can help you protect Studio access in two ways:

1. Built-in in-memory user
2. Host Managed Authentication (support from retreever-spring version 2.0.0)

Retreever authentication applies only to Retreever-owned routes and resources, including Studio, generated documentation, login, refresh, and logout. The host application continues to own security for its own APIs, users, roles, sessions, CSRF rules, and authorization policies.

## Built-in In-Memory User

The built-in in-memory user is the simplest Retreever authentication mode. It protects Retreever Studio using a username and password configured in the host application's configuration.

```yaml
retreever:
  auth:
    username: admin
    password: change-me
```

When both `retreever.auth.username` and `retreever.auth.password` are configured, Retreever enables built-in authentication for Studio access.

This user exists only inside Retreever authentication. It is not added to the host application's user store and does not affect host application login behavior.

If a Host Managed Authentication bean is available, the configured username and password are ignored. In that case, these properties can be avoided.

## Host Managed Authentication (v2.0.0)

Host Managed Authentication allows the host application to decide who can access Retreever Studio.

The host application provides a `RetreeverAuthenticator` bean. During Retreever login, Retreever passes the submitted principal and credential to this bean. The host application validates them using its own user store, policy, or authentication logic, and returns the authentication result to Retreever.

```java
@Bean
RetreeverAuthenticator retreeverAuthenticator(HostAuthService hostAuthService) {
    return request -> {
        // principal is the username and credential is the password submitted from Retreever login.
        // Authenticate the user in the host application and return the result to Retreever.
        // example:
        boolean authenticated = hostAuthService.authenticate(
                request.principal(),
                request.credential()
        );

        return authenticated
                ? RetreeverAuthenticationResult.authenticated(request.principal())
                : RetreeverAuthenticationResult.unauthenticated();
    };
}
```

Host Managed Authentication is suitable when Studio access should follow the host application's internal users, admin accounts, access policy, or custom login validation.

Retreever delegates only the login validation to the host application. After successful login, Retreever still issues and manages its own authentication cookies for Retreever Studio access.

When a `RetreeverAuthenticator` bean is present, it takes precedence over `retreever.auth.username` and `retreever.auth.password`.

## Stable Auth Secret (Recommended)

Retreever uses an auth secret to protect Retreever login sessions and auth token state.

A stable secret should be configured when the application is deployed behind a load balancer, runs with multiple instances, or when multiple Retreever-enabled services behind the same gateway/proxy are expected to use consistent Retreever authentication behavior.

```yaml
retreever:
  auth:
    secret: 123e4567-e89b-12d3-a456-426614174000
```

All instances that need to validate the same Retreever login session should use the same secret.

If the secret is missing or invalid, Retreever generates a startup-only secret. In that case, existing Retreever login sessions become invalid after application restart, and sessions may not work consistently across multiple application instances.

## Token Lifetime

Retreever authentication uses access and refresh tokens managed through Retreever-owned cookies.

The access token controls the active Studio session duration. The refresh token allows Retreever to continue the session without forcing the user to log in again immediately after the access token expires.

```yaml
retreever:
  auth:
    access-token-ttl: 30m
    refresh-token-ttl: 7d
```

The default access token duration is 30 minutes. The default refresh token duration is 7 days.

## Secure Cookies

Retreever auth cookies are `HttpOnly`, `SameSite=Lax`, scoped to the Retreever path, time-limited, and marked `Secure` by default.

```yaml
retreever:
  auth:
    secure-cookies: true
```

`secure-cookies` controls only the `Secure` attribute on Retreever cookies. It does not enable or disable Retreever authentication.

For local HTTP-only development, this can be disabled when the browser does not retain the Retreever login session over HTTP.

```yaml
retreever:
  auth:
    secure-cookies: false
```

For HTTPS, shared environments, staging, production-like environments, and production, keep secure cookies enabled.

## Allow Retreever Routes Through Spring Security

When the host application uses Spring Security, Retreever routes must be allowed to reach Retreever.

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

`RetreeverPublicPaths.get()` includes Retreever Studio, assets, and runtime routes.

Allowing these paths in the host Spring Security chain does not make Retreever Studio public when Retreever authentication is enabled. It only allows the request to reach Retreever, where Retreever applies its own authentication rules for Studio and Retreever-owned resources.

## Disable Retreever

Retreever can be disabled completely for environments where Studio should not be exposed.

```yaml
retreever:
  enabled: false
```

When disabled, Retreever does not register its controllers, filters, resources, or scanners.

## Auth Properties

| Property                           | Purpose                                                                                                                                                       | Default                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `retreever.auth.username`          | Username for built-in Retreever authentication. Requires `password`. Ignored when a `RetreeverAuthenticator` bean is available.                               | Not set                       |
| `retreever.auth.password`          | Password for built-in Retreever authentication. Requires `username`. Ignored when a `RetreeverAuthenticator` bean is available.                               | Not set                       |
| `retreever.auth.secret`            | Stable UUID used to protect Retreever auth tokens and login guard state. Recommended for restarts, load-balanced deployments, and multi-instance deployments. | Startup-only generated secret |
| `retreever.auth.secure-cookies`    | Controls the `Secure` attribute on Retreever auth cookies.                                                                                                    | `true`                        |
| `retreever.auth.access-token-ttl`  | Duration of the Retreever access token.                                                                                                                       | `30m`                         |
| `retreever.auth.refresh-token-ttl` | Duration of the Retreever refresh token.                                                                                                                      | `7d`                          |

## Security Boundary

Retreever authentication protects Retreever Studio and Retreever-owned routes.

It does not replace the host application's API security model.

This boundary is intentional. Retreever is embedded inside the host application to document and test APIs, while the host application remains responsible for protecting its own business APIs and user access rules.
