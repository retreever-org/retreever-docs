import { useEffect, useRef } from "react";
import Navbar from "./pages/home/Navbar";
import Dashboard from "./dashboard/pages/Dashboard";
import { useDocsStore } from "./store/useDocsStore";
import { DEFAULT_DOC_PATH } from "./dashboard/service/DocSearch";

const SCROLL_STORAGE_KEY = "retreever.currentScrollTop";

export default function App() {
  const mainRef = useRef<HTMLElement | null>(null);
  const currentPath = useDocsStore((state) => state.current.path);
  const currentMarkdown = useDocsStore((state) => state.current.markdown);
  const hydratedRef = useRef(false);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const storedPath =
      sessionStorage.getItem("retreever.currentDocPath") || currentPath;
    const storedScroll = Number(sessionStorage.getItem(SCROLL_STORAGE_KEY) || "0");

    if (!hydratedRef.current) {
      if (!currentPath || !currentMarkdown) return;

      if (currentPath === storedPath) {
        el.scrollTo({
          top: storedScroll,
          left: 0,
          behavior: "auto",
        });
        hydratedRef.current = true;
        previousPathRef.current = currentPath;
        return;
      }

      if (currentPath === DEFAULT_DOC_PATH) {
        el.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
        hydratedRef.current = true;
        previousPathRef.current = currentPath;
      }

      return;
    }

    if (previousPathRef.current !== currentPath) {
      el.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      previousPathRef.current = currentPath;
    }
  }, [currentPath, currentMarkdown]);

  const handleScroll = () => {
    const el = mainRef.current;
    if (!el) return;

    sessionStorage.setItem(SCROLL_STORAGE_KEY, String(el.scrollTop));
  };

  return (
    <div className="flex flex-col h-screen bg-surface-700">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main
          ref={mainRef}
          onScroll={handleScroll}
          className="flex-1 overflow-auto"
        >
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
