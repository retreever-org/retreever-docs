import { useLocation } from "react-router-dom";
import { markdownFiles } from "../service/DocsResolver";
import { getMarkdown } from "../service/DocSearch";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

const ContentDisplay: React.FC = () => {
  const location = useLocation();

  const fullPath = location.pathname;
  const markdownContent = getMarkdown(fullPath, markdownFiles);

  return (
    <div
      className="text-slate-200 p-4 md:p-8 tracking-wide mt-10 transition-all duration-300"
    >
      {markdownContent ? (
        <MarkdownRenderer
          markdown={markdownContent}
          className="prose prose-invert max-w-none"
        />
      ) : (
        <div>
          <h1>No Content</h1>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
