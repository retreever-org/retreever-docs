import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  className,
}) => {
  const components: Components = {
    // Headings - Dark mode
    h1: ({ node, ...props }) => (
      <h1
        className="text-4xl font-semibold mt-8 mb-4 pb-2 text-white"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-3xl font-semibold mt-7 mb-4 pb-2 text-white"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-2xl font-semibold mt-6 mb-4 text-gray-100"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        className="text-lg font-semibold mt-5 mb-3 text-gray-100"
        {...props}
      />
    ),

    hr: () => <hr className="my-8 border-t border-neutral-500/50 opacity-50" />,

    // Paragraphs - Dark mode
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-7 text-gray-200" {...props} />
    ),

    // Links - Dark mode
    a: ({ node, ...props }) => (
      <a
        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
        {...props}
      />
    ),

    // Lists - Dark mode
    ul: ({ node, ...props }) => (
      <ul className="mb-4 ml-6 space-y-2 list-disc text-gray-200" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="mb-4 ml-6 space-y-2 list-decimal text-gray-200"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className="leading-7 text-gray-200" {...props} />
    ),

    // Blockquotes - Dark mode
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="my-4 pl-4 border-l-4 border-blue-500 bg-gray-800/50 py-2 pr-4 italic text-gray-300"
        {...props}
      />
    ),

    // Tables - Dark mode
    table: ({ node, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table
          className="min-w-full border-collapse border border-(--dark-border)"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-black/50" {...props} />,
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr
        className="border-b border-(--dark-border) hover:bg-black/30"
        {...props}
      />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-2 text-left font-semibold border border-(--dark-border) text-gray-100 bg-black/20"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        className="px-4 py-2 border border-(--dark-border) text-gray-200"
        {...props}
      />
    ),

    // Text formatting - Dark mode
    strong: ({ node, ...props }) => (
      <strong className="font-bold text-white" {...props} />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-gray-200" {...props} />
    ),
    del: ({ node, ...props }) => (
      <del className="line-through text-gray-500" {...props} />
    ),

    // Code - Enhanced dark mode
    code: ({ node, className, children, ...props }) => {
      const raw = String(children ?? "");
      const isMultiline = raw.includes("\n");
      const match = /language-(\w+)/.exec(className ?? "");
      const language = match?.[1];

      const base = "font-mono text-sm";

      // Inline code - Dark mode
      if (!isMultiline) {
        return (
          <code
            className={`${base} px-1.5 py-0.5 rounded bg-gray-800/70 text-teal-300/80`}
            {...props}
          >
            {children}
          </code>
        );
      }

      // Code block - Dark mode
      return (
        <pre className="my-4 rounded-lg bg-(--dark-3)/70 p-4 overflow-auto border border-(--dark-border)">
          <code
            className={`${base} text-gray-100 ${
              language ? `language-${language}` : ""
            }`}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },

    // Images
    img: ({ node, ...props }) => (
      <img className="max-w-full h-auto my-4 rounded-lg shadow-lg" {...props} />
    ),

    // Task list items (GFM)
    input: ({ node, ...props }) => (
      <input className="mr-2 align-middle" {...props} />
    ),
  };

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

// Demo component
export default function MarkdownDemo() {
  const sampleMarkdown = `# Main Heading

This is a paragraph with **bold text**, *italic text*, and ~~strikethrough~~. You can also add [links](https://example.com) and \`inline code\`.

## Subheading

Here's a blockquote:

> This is a blockquote. It can contain multiple lines
> and will be styled accordingly.

### Lists

Unordered list:
- First item
- Second item
  - Nested item
- Third item

Ordered list:
1. First step
2. Second step
3. Third step

### Code Blocks

Inline code: \`const x = 42;\`

Code block:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

### Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Search | Done | High |
| Export | In Progress | Medium |
| Import | Planned | Low |

### Task Lists

- [x] Completed task
- [ ] Pending task
- [ ] Another task

---

### Images

![Placeholder](https://via.placeholder.com/600x200)

That's it! 🎉`;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <MarkdownRenderer markdown={sampleMarkdown} />
      </div>
    </div>
  );
}
