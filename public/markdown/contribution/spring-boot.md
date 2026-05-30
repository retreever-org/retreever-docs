---
title: Spring Boot
---

# Contributing to retreever-spring

This page explains the local setup for contributing to Retreever's Spring library, browser Studio, and example Spring Boot application.

## 1. Clone The Repositories

Clone these repositories from GitHub and open them in your editor:

- `retreever-spring` - Spring Boot library and JAR packaging
- `retreever-ui` - browser Studio bundled into the library
- `retreever-spring-example` - example app used for manual verification

Keep the three repositories side by side locally. That makes it easier to move between library code, UI code, and the example app during development.

## 2. Set Up retreever-ui

Install the UI dependencies once:

```bash
npm install
```

Use your editor and `npm run dev` for normal UI development. Use `npm run build` when you need to verify the production Studio bundle.

## 3. Set Up retreever-spring

Open `retreever-spring` as a Maven project in your editor and let the editor import dependencies.

No build command is required just to read, edit, or run tests from the editor. When you need to produce the local JAR, run:

```bash
mvn clean install
```

This installs `dev.retreever:retreever` into your local Maven repository so the example app can use your current library changes.

## 4. Set Up retreever-spring-example

Open `retreever-spring-example` in your editor after the local library JAR is installed.

Run the example app from your editor. It starts on:

```text
http://localhost:9000
```

Open Retreever Studio at:

```text
http://localhost:9000/retreever
```

Use the example app to verify controller discovery, generated documentation, request execution, Retreever auth, storage behavior, and the embedded Studio experience.

## Local Development Flow

1. Change `retreever-ui` when the browser Studio behavior or design changes.
2. Change `retreever-spring` when discovery, generated documents, auth, resource serving, or packaging changes.
3. Run affected tests from your editor.
4. Run `npm run build` in `retreever-ui` when UI production output must be checked.
5. Run `mvn clean install` in `retreever-spring` when the example app needs your latest local library JAR.
6. Run `retreever-spring-example` and verify the behavior in the browser.

## Packaging Note

`retreever-spring` packages the Studio into the released JAR. During the Maven packaging flow, it fetches `retreever-ui`, builds it, and copies the built assets into the JAR resources.

Because of that, UI-only changes should be verified in `retreever-ui` first, then verified again through `retreever-spring` when the packaged JAR behavior matters.

## Before Opening A Pull Request

1. Keep the change focused.
2. Run the affected tests.
3. Build the UI if the Studio changed.
4. Build and install the Spring library if packaging or example verification is needed.
5. Check the example app at `/retreever`.
6. Update docs when public behavior, configuration, or setup changes.
