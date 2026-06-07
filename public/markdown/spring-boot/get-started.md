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
