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
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-semibold my-6" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-semibold my-4" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-semibold my-3" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-3 leading-relaxed" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="ml-5 list-disc" {...props} />
    ),

    code: ({ node, className, children, ...props }) => {
      const raw = String(children ?? "");
      const isMultiline = raw.includes("\n");

      // react-markdown sets className like "language-java"
      const match = /language-(\w+)/.exec(className ?? "");
      const language = match?.[1]

      const base = "font-mono text-sm";

      // Inline code (single backticks)
      if (!isMultiline) {
        return (
          <code
            className={`${base} px-1 mx-0.5 py-0.5 rounded bg-slate-100/10 text-slate-300`}
            {...props}
          >
            {children}
          </code>
        );
      }

      // Code block – we have multiple lines
      return (
        <pre className="my-3 rounded bg-slate-900 p-3 overflow-auto">
          <code
            className={`${base} ${language ? `language-${language}` : ""}`}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },
  };

  return (
    <div className={className}>
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
