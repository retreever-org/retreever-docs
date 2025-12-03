import { useDocsStore } from "../../store/useDocsStore";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";

const ContentDisplay: React.FC = () => {
  const { current } = useDocsStore();

  function prettifyDocsPath(path: string | null): string {
    if (!path) return "Introduction";

    return path
      .replace(/^\/docs\/?/i, "")
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.replace(/-/g, " "))
      .map((segment) => segment.replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(" / ");
  }

  return (
    <div className="text-text-primary px-4 md:p-4 lg:px-12 lg:w-7/12 pt-2 lg:mt-14 transition-all duration-300">
      <div className="mt-20 lg:mt-4"></div>
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
        {prettifyDocsPath(current.path)}
      </div>
      {current.markdown ? (
        <MarkdownRenderer
          markdown={current.markdown}
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
            This page doesn't have any content at the moment. Check back soon or
            explore other sections of the documentation.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
