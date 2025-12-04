import React, { type ReactElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { CodeBlock } from "./CodeBlock";
import { slugify } from "../../service/Slugify";

export interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

function getNodeText(node: ReactNode): string {
  if (node == null) return "";

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (typeof node === "object") {
    const el = node as ReactElement<any>;
    return getNodeText(el.props?.children);
  }

  return "";
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
}) => {
  const components: Components = {
    // Headings - Dark mode
    h1: ({ node, ...props }) => {
      const text = getNodeText(props.children);
      const id = slugify(text);
      return (
        <h1
          id={id}
          className="text-4xl font-medium mt-8 mb-4 pb-2 text-text-primary scroll-mt-28"
          {...props}
        />
      );
    },
    h2: ({ node, ...props }) => {
      const text = getNodeText(props.children);
      const id = slugify(text);
      console.log("Generated slug text: ", text);
      console.log("Generated slug id: ", id);
      return (
        <h2
          id={id}
          className="text-2xl font-medium my-7 text-text-primary scroll-mt-28"
          {...props}
        />
      );
    },
    h3: ({ node, ...props }) => {
      const text = getNodeText(props.children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-xl font-medium my-7 text-text-primary scroll-mt-28"
          {...props}
        />
      );
    },
    h4: ({ node, ...props }) => {
      const text = getNodeText(props.children);
      const id = slugify(text);
      return (
        <h4
          id={id}
          className="text-lg font-medium mt-5 mb-3 text-text-primary scroll-mt-28"
          {...props}
        />
      );
    },

    hr: () => <hr className="my-8 border-t border-border-subtle" />,

    // Paragraphs - Dark mode
    p: ({ node, ...props }) => (
      <p
        className="text-[1rem] md:text-[0.92rem] mb-4 leading-7 text-text-paragraph"
        {...props}
      />
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
      <ul
        className="custom-list mb-5 ml-6 space-y-2 list-disc text-text-paragraph text-[1rem] md:text-[0.92rem]"
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="custom-list mb-5 ml-6 space-y-2 list-decimal text-text-paragraph text-[1rem] md:text-[0.92rem]"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li
        className="mb-3 leading-7 text-text-paragraph pl-3.5 text-[1rem] md:text-[0.92rem]"
        {...props}
      />
    ),

    // Blockquotes - Dark mode
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="my-4 pl-4 border-l-4 border-b-zinc-500 bg-slate-800/30 py-2 pr-4 italic text-text-muted"
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
        className="px-4 py-2 text-left text-[1rem] md:text-[0.92rem] font-semibold border border-(--dark-border) text-text-primary bg-black/20"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        className="px-4 py-2 text-[1rem] md:text-[0.92rem] border border-(--dark-border) text-text-paragraph"
        {...props}
      />
    ),

    // Text formatting - Dark mode
    strong: ({ node, ...props }) => (
      <strong
        className="font-semibold text-[1rem] md:text-[0.92rem] text-text-primary"
        {...props}
      />
    ),
    em: ({ node, ...props }) => (
      <em className="italic text-text-paragraph" {...props} />
    ),
    del: ({ node, ...props }) => (
      <del className="line-through text-text-muted" {...props} />
    ),

    // Code - Enhanced dark mode
    code: CodeBlock,

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
