import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDocsStore, useDocTree } from "../../store/useDocsStore";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";
import type { DocNode } from "../types/docfile.types";
import { toDocHref } from "../service/DocSearch";

function flattenDocs(tree: DocNode[]): { path: string; title: string }[] {
  const result: { path: string; title: string }[] = [];

  function walk(nodes: DocNode[]) {
    for (const node of nodes) {
      if (node.type === "file") {
        result.push({
          path: node.path,
          title: node.title || node.name,
        });
      } else {
        walk(node.children);
      }
    }
  }

  walk(tree);
  return result;
}

const ContentDisplay: React.FC = () => {
  const navigate = useNavigate();
  const { current } = useDocsStore();
  const { tree } = useDocTree();
  const flatDocs = useMemo(() => flattenDocs(tree), [tree]);

  const nextDocs = useMemo(() => {
    if (!current.path || flatDocs.length === 0) return [];
    const idx = flatDocs.findIndex((d) => d.path === current.path);
    if (idx === -1) return [];
    return flatDocs.slice(idx + 1, idx + 4);
  }, [current.path, flatDocs]);

  function prettifyDocsPath(path: string | null): string {
    if (!path) return "Get Started";

    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.replace(/-/g, " "))
      .map((segment) => segment.replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(" / ");
  }

  return (
    <div className="text-text-primary px-4 md:p-4 lg:px-12 transition-all duration-300 md:mb-60">
      <div
        className="
          text-primary-400 
          text-[11px] 
          tracking-wider 
          font-semibold 
          px-3 py-1 
          rounded-md 
          bg-primary-500/10
          border border-primary-500/20 
          w-max 
          uppercase
        "
      >
        {prettifyDocsPath(current.path)}
      </div>

      {current.markdown ? (
        <>
          <MarkdownRenderer
            markdown={current.markdown}
            className="prose prose-invert max-w-none"
          />

          {nextDocs.length > 0 && (
            <div className="mt-10 border-t border-surface-500/20 pt-6">
              <h3 className="text-sm font-semibold text-text-paragraph tracking-wider mb-3">
                READ NEXT
              </h3>
              <div className="flex flex-col gap-2">
                {nextDocs.map((doc) => (
                  <button
                    key={doc.path}
                    type="button"
                    onClick={() => navigate(toDocHref(doc.path))}
                    className="
                      block
                      rounded-lg
                      border border-surface-500/20
                      hover:border-primary-500/40
                      bg-surface-900/20
                      px-4 py-3
                      text-sm
                      text-primary-400
                      hover:text-primary-500
                      hover:bg-surface-900/30
                      transition-all
                      duration-150
                      text-left
                    "
                  >
                    <div className="font-semibold">{doc.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center text-center p-8">
          <div className="text-4xl mb-4">...</div>
          <h2 className="text-xl font-semibold text-text-primary">
            Documentation is loading
          </h2>
          <p className="text-text-muted text-sm mt-2 max-w-sm">
            The docs are being fetched and rendered directly on the home page.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
