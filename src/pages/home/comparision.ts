export const comparisonData = {
  tools: [
    { id: "swagger", name: "Swagger UI", logo: "/swagger.svg" },
    { id: "springdoc", name: "SpringDoc", logo: "/springdoc.svg" },
    { id: "postman", name: "Postman", logo: "/postman.svg" },
    { id: "retreever", name: "Retreever", logo: "/retreever-icon-box.svg" }
  ],

  features: [
    {
      feature: "Auto-generates docs",
      swagger: "✔ Yes",
      springdoc: "✔ Yes",
      postman: "✖ No",
      retreever: "✔ Yes"
    },
    {
      feature: "Reflective schema generation",
      swagger: "✔ Basic",
      springdoc: "✔ Good",
      postman: "✖ No",
      retreever: "✔ Deep & accurate"
    },
    {
      feature: "Generic type resolution",
      swagger: "⚠ Weak",
      springdoc: "✔ Good",
      postman: "✖ None",
      retreever: "✔ Strong"
    },
    {
      feature: "Nested generics support",
      swagger: "⚠ Partial",
      springdoc: "✔ Good",
      postman: "✖ No",
      retreever: "✔ Accurate"
    },
    {
      feature: "Record type support",
      swagger: "⚠ Partial",
      springdoc: "✔ Good",
      postman: "✖ N/A",
      retreever: "✔ Full"
    },
    {
      feature: "Map schema resolution",
      swagger: "⚠ Basic",
      springdoc: "✔ Good",
      postman: "✖ No",
      retreever: "✔ Clean intuitive form"
    },
    {
      feature: "Recursive type handling",
      swagger: "⚠ Limited",
      springdoc: "⚠ Limited",
      postman: "✖ No",
      retreever: "✔ Supported"
    },
    {
      feature: "DTO example values",
      swagger: "✖ Missing",
      springdoc: "⚠ Partial (annotations only)",
      postman: "⚠ Manual only",
      retreever: "✔ Auto-generated (constraints-aware)"
    },
    {
      feature: "Validation annotations included",
      swagger: "✖ No",
      springdoc: "✔ Partial",
      postman: "✖ No",
      retreever: "✔ Yes"
    },
    {
      feature: "Error mapping",
      swagger: "⚠ Basic",
      springdoc: "⚠ Good",
      postman: "✖ Manual",
      retreever: "✔ Strong (@ApiError + exception resolver)"
    },
    {
      feature: "Derives status codes automatically",
      swagger: "✖ No",
      springdoc: "⚠ Partial",
      postman: "✖ No",
      retreever: "✔ Yes"
    },
    {
      feature: "Auto-docs for ControllerAdvice",
      swagger: "✖ No",
      springdoc: "⚠ Partial (with annotations)",
      postman: "✖ No",
      retreever: "✔ Yes"
    },
    {
      feature: "Testing panel",
      swagger: "✖ No",
      springdoc: "✖ No",
      postman: "✔ Yes",
      retreever: "✔ Yes"
    },
    {
      feature: "Editable request body",
      swagger: "✔ Yes",
      springdoc: "✔ Yes",
      postman: "✔ Yes",
      retreever: "✔ Yes"
    },
    {
      feature: "Realtime endpoint testing",
      swagger: "✔ Yes",
      springdoc: "✔ Yes",
      postman: "✔ Yes",
      retreever: "✔ Yes"
    },
    {
      feature: "Docs always up-to-date",
      swagger: "✖ No (manual annotations)",
      springdoc: "⚠ Partial (annotations required)",
      postman: "✖ No",
      retreever: "✔ Always (reflection-driven)"
    },
    {
      feature: "Annotation clutter",
      swagger: "⚠ Medium",
      springdoc: "⚠ High (OpenAPI metadata)",
      postman: "✔ None",
      retreever: "✔ Minimal (optional annotations only)"
    },
    {
      feature: "Startup performance",
      swagger: "⚠ Heavy",
      springdoc: "⚠ Medium-heavy",
      postman: "N/A",
      retreever: "✔ ~100ms for ~50 endpoints"
    },
    {
      feature: "Latency to serve docs",
      swagger: "⚠ 80–150ms typical",
      springdoc: "⚠ 60–100ms",
      postman: "✔ Fast",
      retreever: "✔ ~30ms"
    },
    {
      feature: "Output JSON size",
      swagger: "⚠ Large",
      springdoc: "⚠ Large",
      postman: "✖ N/A",
      retreever: "✔ ~45KB"
    },
    {
      feature: "Modern UI",
      swagger: "⚠ Aging",
      springdoc: "⚠ Basic",
      postman: "✔ Modern",
      retreever: "✔ Modern, clean"
    },
    {
      feature: "Zero YAML",
      swagger: "✖ Requires YAML/JSON config",
      springdoc: "⚠ Optional YAML",
      postman: "✔ No YAML",
      retreever: "✔ No YAML needed"
    },
    {
      feature: "Developer onboarding speed",
      swagger: "⚠ Medium",
      springdoc: "⚠ Medium",
      postman: "✔ Fast",
      retreever: "✔ Instant"
    },
    // {
    //   feature: "Code-first workflow",
    //   swagger: "⚠ Mixed (annotations)",
    //   springdoc: "⚠ Mixed (annotations)",
    //   postman: "✖ Tool-first",
    //   retreever: "✔ Pure code-first"
    // },
    // {
    //   feature: "Auto-grouping by controller",
    //   swagger: "✖ Manual",
    //   springdoc: "✔ Yes",
    //   postman: "✖ No",
    //   retreever: "✔ Yes"
    // },
    {
      feature: "Schema clarity",
      swagger: "⚠ Verbose",
      springdoc: "⚠ Heavy",
      postman: "✖ Minimal",
      retreever: "✔ Clean & predictable"
    },
    {
      feature: "Customization flexibility",
      swagger: "✔ High",
      springdoc: "✔ High",
      postman: "✔ UI-level",
      retreever: "✔ High (annotations + resolvers)"
    },
    {
      feature: "Docs + Testing unified",
      swagger: "✖ Docs only",
      springdoc: "✖ Docs only",
      postman: "✔ Testing only",
      retreever: "✔ Unified"
    }
  ]
};

