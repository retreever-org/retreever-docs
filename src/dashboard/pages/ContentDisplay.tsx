import { useLocation } from "react-router-dom";
import { markdownFiles } from "../service/DocsResolver";
import { getMarkdown } from "../service/DocSearch";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

const ContentDisplay: React.FC = () => {
  const location = useLocation();

  const fullPath = location.pathname
    .replace(/^\/docs\/?/i, "")
    .toLowerCase()
    .trim();
  const markdownContent = getMarkdown(fullPath, markdownFiles);

  function prettifyDocsPath(path: string): string {
    if (!path) return "";

    return path
      .replace(/^\/docs\/?/i, "") // remove leading "/docs/"
      .split("/") // split into parts
      .filter(Boolean) // remove empty items
      .map((segment) => segment.replace(/-/g, " ")) // convert dashes to words
      .map((segment) => segment.replace(/\b\w/g, (c) => c.toUpperCase())) // capitalize
      .join(" / "); // breadcrumb style
  }

  return (
    <div className="text-text-primary px-4 md:p-4 lg:px-12 lg:w-7/12 lg:mt-14 transition-all duration-300">
      <div
        className="
      text-accent-hover 
      text-[11px] 
      tracking-wider 
      font-semibold 
      px-3 py-1 
      rounded-md 
      bg-accent/10 
      border border-accent/20 
      w-max 
      uppercase
    "
      >
        {prettifyDocsPath(!fullPath ? "introduction" : fullPath)}
      </div>
      {markdownContent ? (
        <MarkdownRenderer
          markdown={markdownContent}
          className="prose prose-invert max-w-none"
        />
      ) : (
        <div
          className="
            mt-12 
            flex flex-col items-center justify-center 
            text-center 
            p-8 
        "
        >
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-slate-200">
            No Content Available
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-sm">
            This page doesn’t have any content at the moment. Check back soon or
            explore other sections of the documentation.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
