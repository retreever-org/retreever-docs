---
title: Security
---

# Security

Retreever Studio exposes the generated API contract and can execute requests from the browser. In local development that is the point; in shared or data-bearing environments it is a surface that must be protected.

Retreever protects only its own routes and resources. The host application remains responsible for the security of business APIs, users, roles, sessions, CSRF rules, and authorization policies.

Retreever supports two Studio authentication modes:

1. Built-in static user configured through application properties.
2. Host Managed Authentication through a `RetreeverAuthenticator` bean.

## Choose An Auth Mode

| Situation | Recommended mode |
| --- | --- |
| Studio needs a simple shared credential for a local, internal, or temporary environment | Built-in static user |
| Studio access must follow existing application users, admin accounts, directory users, or custom policy | Host Managed Authentication |
| Studio must not be exposed at all in an environment | Disable Retreever |

## Built-in Static User

Use the built-in static user when the Studio only needs one configured username and password. This mode is suitable for local demos, small internal test environments, or temporary protected access.

Do not use this mode when Studio access must be tied to real user identity, roles, audit rules, or existing admin policy. Use Host Managed Authentication for that.

```yaml
retreever:
  auth:
    username: admin
    password: change-me
```

When both `retreever.auth.username` and `retreever.auth.password` are configured, Retreever enables built-in authentication for Studio access. If only one of the two values is configured, Retreever treats the static auth configuration as invalid and disables static authentication.

This user exists only inside Retreever authentication. It is not added to the host application's user store and does not affect host application login behavior.

If a Host Managed Authentication bean is available, the configured username and password are ignored. In that mode, do not configure static username/password unless you intentionally keep them as fallback documentation for another profile.

## Host Managed Authentication

Use Host Managed Authentication when the host application must decide who can access the Studio. This mode is suitable for existing users, admin accounts, internal access rules, or custom credential validation.

The host application provides a `RetreeverAuthenticator` bean. During Retreever login, Retreever passes the submitted principal and credential to this bean. The host application validates them using its own user store, admin policy, directory service, or custom login logic, then returns the authentication result to Retreever.

```java
import dev.retreever.auth.RetreeverAuthenticator;
import dev.retreever.auth.RetreeverAuthenticationResult;
import org.springframework.context.annotation.Bean;

@Bean
RetreeverAuthenticator retreeverAuthenticator(HostAuthService hostAuthService) {
    return request -> {
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

The Retreever login payload remains `{ "username": "...", "password": "..." }`. Retreever maps those values to `principal` and `credential` for the host-auth request.

Retreever delegates only the login validation to the host application. After successful login, Retreever still issues and manages its own authentication cookies for Retreever Studio access.

When a `RetreeverAuthenticator` bean is present, it takes precedence over `retreever.auth.username` and `retreever.auth.password`.

## Stable Auth Secret

Retreever uses an auth secret to protect Retreever login sessions and auth token state.

Configure a stable UUID when:

| Condition |
| --- |
| The application runs with more than one instance. |
| The application is behind a load balancer. |
| Retreever sessions should survive application restarts. |
| Multiple Retreever-enabled services behind the same gateway need consistent Retreever authentication behavior. |

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

The default access token duration is 30 minutes. The default refresh token duration is 7 days. The values must be positive durations; invalid or non-positive values fall back to the defaults.

## Secure Cookies

Retreever auth cookies are `HttpOnly`, `SameSite=Lax`, scoped to the Retreever path, time-limited, and marked `Secure` by default.

```yaml
retreever:
  auth:
    secure-cookies: true
```

`secure-cookies` controls only the `Secure` attribute on Retreever cookies. It does not enable or disable Retreever authentication.

Set `secure-cookies: false` only for local HTTP-only development when the browser does not retain the Retreever login session over HTTP.

```yaml
retreever:
  auth:
    secure-cookies: false
```

Keep `secure-cookies: true` for HTTPS, shared environments, staging, production-like environments, and production.

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

`RetreeverPublicPaths.get()` includes `/retreever` and `/retreever/**`.

Allowing these paths in the host Spring Security chain does not make Retreever Studio public when Retreever authentication is enabled. It only allows the request to reach Retreever, where Retreever applies its own authentication rules for Studio and Retreever-owned resources.

## Disable Retreever

Set `retreever.enabled=false` when Retreever Studio must not be exposed in an environment at all.

```yaml
retreever:
  enabled: false
```

When disabled, Retreever does not register its controllers, filters, resources, or scanners. Use this for production environments where documentation and browser-based API testing are not allowed.

## Auth Properties

| Property | Purpose | Default |
| --- | --- | --- |
| `retreever.auth.username` | Username for built-in Retreever authentication. Requires `password`. Ignored when a `RetreeverAuthenticator` bean is available. | Not set |
| `retreever.auth.password` | Password for built-in Retreever authentication. Requires `username`. Ignored when a `RetreeverAuthenticator` bean is available. | Not set |
| `retreever.auth.secret` | Stable UUID used to protect Retreever auth tokens and login guard state. Recommended for restarts, load-balanced deployments, and multi-instance deployments. | Startup-only generated secret |
| `retreever.auth.secure-cookies` | Controls the `Secure` attribute on Retreever auth cookies. | `true` |
| `retreever.auth.access-token-ttl` | Duration of the Retreever access token. | `30m` |
| `retreever.auth.refresh-token-ttl` | Duration of the Retreever refresh token. | `7d` |

## Security Boundary

Retreever authentication protects Retreever Studio and Retreever-owned routes.

It does not replace the host application's API security model.

This boundary is intentional. Retreever is embedded inside the host application to document and test APIs, while the host application remains responsible for protecting its own business APIs and user access rules.
