---
title: Retreever in Proxy and Load-Balancer Deployments
---

# Retreever in Proxy and Load-Balancer Deployments

Retreever Studio is served by the host application under the same origin, for example:

```
https://your-domain.com/retreever
```

When you test APIs from Retreever Studio, the browser calls the host application APIs under the same origin, for example:

```
https://your-domain.com/api/...
```

This is the normal and intended setup.

In some deployments, the browser-facing URL and the internal request received by the application can differ because HTTPS is terminated by a platform edge, reverse proxy, load balancer, API gateway, or ingress before the request reaches the application.

Example:

```
Browser-facing URL:
https://your-domain.com

Internal request received by the app:
http://app-container:8080
```

This is common in cloud and proxy-based deployments.

For browser-based API testing to work correctly, the application should understand the original browser-facing scheme, host, and port. This is usually done through forwarded headers such as:

```
Forwarded
X-Forwarded-Proto
X-Forwarded-Host
X-Forwarded-Port
```

Most backend frameworks provide a setting to trust and use these forwarded headers when the application is running behind a controlled proxy or platform edge.

For Spring Boot applications, use:

```yaml
server:
  forward-headers-strategy: framework
```

This helps Spring Boot understand the original browser-facing request as:

```
https://your-domain.com
```

instead of only seeing the internal request:

```
http://app-container:8080
```

Use the equivalent forwarded-header or proxy-trust configuration for other frameworks such as Express, NestJS, FastAPI, Django, Go, or similar backend stacks.

Only enable forwarded-header handling when the application is reached through a controlled deployment boundary such as a managed platform edge, load balancer, ingress, Nginx, Apache, Caddy, API gateway, or similar reverse proxy, and the application port itself is not directly exposed to public users.

In simple terms, this is the expected deployment shape:

```
Browser
  ↓
Platform edge / Load balancer / Reverse proxy / Ingress
  ↓
Application
```

Avoid enabling forwarded-header trust blindly if users can directly access the application port, for example:

```
http://server-ip:8080
```

or:

```
http://server-ip:9000
```

For Retreever, this matters because Retreever executes API requests from the browser and respects the host application’s normal security behavior. If the application does not understand its browser-facing URL correctly, the host application may reject browser-style API requests even though the request is same-origin from the user’s perspective.

A quick symptom check:

```
Request without Origin header -> works
Request with Origin header    -> rejected by host app CORS/security
```

In that case, review the application’s proxy/forwarded-header configuration for the deployment.