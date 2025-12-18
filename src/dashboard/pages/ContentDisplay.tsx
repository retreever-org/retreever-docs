import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDocsStore, useDocTree } from "../../store/useDocsStore";
import { MarkdownRenderer } from "../components/markdown/MarkdownRenderer";
import type { DocNode } from "../types/docfile.types";

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
  const { current } = useDocsStore();
  const { tree } = useDocTree();
  const [flatDocs, setFlatDocs] = useState<{ path: string; title: string }[]>([]);


  // Load and flatten doc tree once
  useEffect(() => {
    (async () => {
      setFlatDocs(flattenDocs(tree));
    })();
  }, [tree]);


  // Compute next suggestions based on current.path
  const nextDocs = useMemo(() => {
    if (!current.path || flatDocs.length === 0) return [];
    const idx = flatDocs.findIndex((d) => d.path === current.path);
    if (idx === -1) return [];
    return flatDocs.slice(idx + 1, idx + 4); // next 3 docs
  }, [current.path, flatDocs]);


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
    <div className="text-text-primary px-4 md:p-4 lg:px-12 pt-2 lg:mt-14 transition-all duration-300 md:mb-60">
      <div className="mt-20 lg:mt-4" />
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
        <>
          <MarkdownRenderer
            markdown={current.markdown}
            className="prose prose-invert max-w-none"
          />

          {nextDocs.length > 0 && (
            <div className="mt-10 border-t border-border-subtle pt-6">
              <h3 className="text-sm font-semibold text-text-paragraph tracking-wider mb-3">
                READ NEXT
              </h3>
              <div className="flex flex-col gap-2">
                {nextDocs.map((doc) => (
                  <Link
                    key={doc.path}
                    to={`/docs/${doc.path}`}
                    className="
                      block
                      rounded-lg
                      border border-border-subtle/60
                      hover:border-accent/20
                      bg-slate-900/40
                      px-4 py-3
                      text-sm
                      text-accent-hover
                      hover:text-accent
                      hover:bg-slate-900/80
                      transition-all
                      duration-150
                    "
                  >
                    <div className="font-semibold">{doc.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
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
