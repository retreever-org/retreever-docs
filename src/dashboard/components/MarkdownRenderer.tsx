import DOMPurify from "dompurify";
import { md } from "../../utils/markdown";

export function MarkdownRenderer({ content }: { content: string }) {
  const dirty = md.render(content);
  const clean = DOMPurify.sanitize(dirty);

  return (
    <div
      className="prose prose-invert max-w-full"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
