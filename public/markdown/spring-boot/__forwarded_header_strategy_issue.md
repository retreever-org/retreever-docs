---
title: Retreever in Proxy and Load-Balancer Deployments
---

# Retreever in Proxy and Load-Balancer Deployments

Retreever Studio is served by the host application under the same origin, for example:

```text
https://your-domain.com/retreever
```

When you test APIs from Retreever Studio, the browser calls the host application APIs under the same origin:

```text
https://your-domain.com/api/...
```

This same-origin setup is intentional. It lets Retreever test the application the way a browser-facing client would reach it.

## Why Proxies Can Change Behavior

In cloud and proxy-based deployments, the browser-facing URL and the internal request received by the application can differ because HTTPS is terminated before the request reaches the application.

Example:

```text
Browser-facing URL:
https://your-domain.com

Internal request received by the app:
http://app-container:8080
```

This can happen with a platform edge, reverse proxy, load balancer, API gateway, or Kubernetes ingress.

For browser-based API testing to work correctly, the application should understand the original browser-facing scheme, host, and port. In proxy deployments, that information is carried through forwarded headers such as:

```text
Forwarded
X-Forwarded-Proto
X-Forwarded-Host
X-Forwarded-Port
```

## Spring Boot Configuration

For Spring Boot applications behind a trusted proxy boundary, use:

```yaml
server:
  forward-headers-strategy: framework
```

This helps Spring Boot understand the original browser-facing request as:

```text
https://your-domain.com
```

instead of only seeing the internal request:

```text
http://app-container:8080
```

Use the equivalent forwarded-header or proxy-trust configuration for other backend stacks.

## When To Enable It

Enable forwarded-header handling only when the application is reached through a controlled deployment boundary such as a managed platform edge, load balancer, ingress, Nginx, Apache, Caddy, API gateway, or similar reverse proxy.

Expected shape:

```text
Browser
  -> Platform edge / Load balancer / Reverse proxy / Ingress
  -> Application
```

Avoid enabling forwarded-header trust blindly if public users can directly access the application port, for example:

```text
http://server-ip:8080
```

or:

```text
http://server-ip:9000
```

Forwarded headers are trust-based. The application should trust them only when a controlled proxy is the component setting or sanitizing those headers.

## Symptom Check

For Retreever, this matters because the Studio executes API requests from the browser and respects the host application's normal security behavior. If the application does not understand its browser-facing URL correctly, the host application may reject browser-style API requests even though the request is same-origin from the user's perspective.

A common symptom is:

```text
Request without Origin header -> works
Request with Origin header    -> rejected by host app CORS/security
```

In that case, review the application's proxy and forwarded-header configuration for the deployment.
