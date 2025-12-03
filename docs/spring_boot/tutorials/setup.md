---
title: Setup
---

# Quickstart

Retreever is designed to be the fastest way to get live API documentation and testing inside your Spring Boot application — with **zero configuration**.

> This guide walks you through installing the library, starting your app, and opening the Retreever UI.

---

## 1. Add the Dependency

Retreever will be published soon to Maven Central under:

```
dev.retreever:retreever-spring:1.0.0
```

Once released, add it to your project:

**Maven**

```xml
<dependency>
  <groupId>dev.retreever</groupId>
  <artifactId>retreever-spring</artifactId>
  <version>1.0.0</version>
</dependency>
```

**Gradle**

```gradle
implementation("dev.retreever:retreever-spring:1.0.0")
```

*No configuration. No annotations required.*

---

## 2. Start Your Spring Boot Application

Just run your app as usual:

```bash
./mvnw spring-boot:run
```

or

```bash
./gradlew bootRun
```

During startup, you’ll see Retreever log messages indicating that it has scanned your controllers, models, generics, and exception handlers.

Typical resolution time: **~100ms for 50+ endpoints**.

---

## 3. Open the Retreever UI

After your app starts, open:

```
http://localhost:8080/retreever
```

You'll see:

* A clean, modern API explorer
* Auto-generated request/response schemas
* Example payloads built from field info + constraints
* Error responses derived from exception handlers
* A built-in testing panel for sending requests instantly

Everything you see reflects **your actual code**, not a manually maintained spec.

---

## 4. (Optional) Add Documentation Enhancements

Retreever works out of the box, but you can optionally decorate your API using a few lightweight annotations:

* `@ApiGroup` — name/organize controllers
* `@ApiDescription` — add descriptions to endpoints or models
* `@ApiExample` — override or enrich example values
* `@ApiError` — customize error responses
* `@ApiHidden` — hide endpoints or models

These annotations are **non-essential** and never required for core functionality.

---

## 5. You're Done

That’s all you need to start using Retreever.
No YAML. No heavy OpenAPI metadata. No Postman collections. No duplication.

Just:

* Install
* Start
* Open `/retreever`

Your documentation and testing environment is ready.
