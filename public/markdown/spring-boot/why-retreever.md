---
title: Why Retreever?
---

# Why Retreever?

Retreever exists for one simple reason:
**API documentation shouldn’t be a chore, and testing shouldn’t require a separate tool.**

Most teams today juggle Swagger/SpringDoc for docs and Postman for testing. That means duplicated effort, outdated specs, scattered workflows, and a ton of annotations that add noise rather than value.

Retreever fixes all of that — by letting your *actual code* define your documentation and by giving you a built-in testing panel that stays perfectly in sync with your API.

---

## Built on Reflection, Not Boilerplate

Retreever reads your controllers, models, generics, constraints, and exception handlers directly.
No YAML.
No OpenAPI files.
No 20-line annotations above every endpoint.

The result is documentation that’s:

* **Accurate** — reflects your real method signatures and DTOs
* **Deep** — nested generics, records, maps, and recursive types are handled correctly
* **Validated** — includes constraint rules and example values
* **Complete** — covers success responses *and* error flows
* **Lightweight** — the entire output is usually around ~45KB

You write clean code, Retreever does the rest.

---

## Error Awareness Without Extra Work

Swagger and SpringDoc require developers to manually specify error responses.
Postman doesn’t know anything about them.

Retreever inspects your `@ControllerAdvice` and exception types to automatically derive:

* status codes
* error descriptions
* error body schema

Your documentation finally shows what your API *actually throws*, without extra metadata.

---

## Testing and Documentation in One Place

Swagger and SpringDoc only document.
Postman only tests.

Retreever does both:

* editable request bodies
* instant request execution
* real responses displayed inline
* no external apps or environments
* no syncing, exporting, or importing collections

You open your app, you test your endpoints, and everything is already up-to-date.

---

## Zero Setup. Zero Noise.

Swagger and SpringDoc rely heavily on annotations and configuration.
Postman requires maintaining external collections.

Retreever requires none of that:

* add the dependency
* start the application
* open `/retreever`

That’s it.

You get auto-grouped endpoints, clean schemas, examples, constraints, and error mappings without ever touching a YAML file or duplicating data.

---

## Fast by Design

Retreever’s entire resolution pipeline is optimized for runtime use:

* **~100ms** startup processing for ~50 endpoints
* **~30ms** response time for serving the full document
* Minimal memory footprint
* Tiny JSON output

It behaves like a native part of your Spring Boot app, not a heavyweight plugin bolted on top.

---

## A Developer Experience That Feels Modern

Swagger UI and SpringDoc haven’t changed much in years.
Postman is polished, but it’s a separate application.

Retreever brings a clean, Postman-like UI *inside your API*, with modern design, instant navigation, and clear schema organization. The UI reflects how developers think today, not a decade ago.

---

## Code-First, Not Annotation-First

Swagger and SpringDoc push you into OpenAPI-style metadata.
Postman is tool-driven.

Retreever is **pure code-first**:

* Your Java types define your models
* Your method signatures define your endpoints
* Your exceptions define your error flows

Optional annotations exist only to add clarity, not to make Retreever work.

---

## A Single Tool That Replaces Three

Retreever gives you:

* Documentation
* Schema clarity
* Error mapping
* Testing panel

All unified. All derived from your code. All in one place.

If your goal is to spend less time maintaining specs and more time building features, Retreever is built exactly for you.
