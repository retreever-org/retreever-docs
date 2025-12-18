# Architecture Overview

Retreever for Spring is a backend library that generates a fully resolved API document during application 
startup using Java Reflection.

Rather than relying on request-time interception or runtime execution paths, Retreever derives the API 
contract directly from the application’s runtime metadata once the Spring Bean container has been initialized. 
This ensures that the generated API document accurately represents the application’s exposed surface at startup.

The bootstrap and resolution flow follows a deterministic, step-driven process:

<img width="3245" height="1841" alt="image" src="https://github.com/user-attachments/assets/0d805481-613f-40ee-b0f8-1d9a6e6986c4" />

**1. ApplicationContext Access**
After the Spring container completes initialization, RetreeverBootstrap gains access to the `ApplicationContext`. 
At this stage, all beans are fully registered and available for inspection.

**2. Controller Scanning**
Using the application context, the `ControllerScanner` discovers all `@RestController` and `@RestControllerAdvice` components. 
These components act as the primary source of truth for endpoints, request/response contracts, and error handling definitions.

**3. Resolution Orchestration**
Once discovery is complete, RetreeverBootstrap delegates the resolution process to the `RetreeverOrchestrator`. 
The orchestrator coordinates the execution of multiple resolution models, each responsible for resolving a specific aspect of 
the API.

**4. API Document Assembly and Caching**
The resolved outputs are passed to the assembler, which constructs a fully serializable and immutable `ApiDocument` instance. 
The final API document is cached in memory within RetreeverBootstrap and reused throughout the application lifecycle.

This startup-driven architecture ensures that API documentation is generated once, remains consistent, and reflects the 
complete state of the application without introducing runtime overhead.
