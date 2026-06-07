import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/pages/Dashboard";
import Help from "./pages/Help";
import DesktopNavbar from "./shared/DesktopNavbar";
import { useDocsStore } from "./store/useDocsStore";
import { DEFAULT_DOC_PATH } from "./dashboard/service/DocSearch";

const SCROLL_STORAGE_KEY = "retreever.currentScrollTop";
const THEME_STORAGE_KEY = "retreever.theme";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

function DocsRoute() {
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
    <div className="flex flex-1 overflow-hidden">
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto"
      >
        <Dashboard />
      </main>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex h-screen flex-col bg-surface-700 text-text-primary">
      <DesktopNavbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<DocsRoute />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
