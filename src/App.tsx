import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/pages/Dashboard";
import Help from "./pages/Help";
import Home from "./pages/Home";
import DesktopNavbar from "./shared/DesktopNavbar";
import { useDocsStore } from "./store/useDocsStore";
import {
  DEFAULT_DOC_PATH,
  normalizeDocPathname,
  toDocHref,
} from "./dashboard/service/DocSearch";

const THEME_STORAGE_KEY = "retreever.theme";
const SCROLL_STORAGE_KEY_PREFIX = "retreever.scrollTop.";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

function DocsRoute() {
  const mainRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = useDocsStore((state) => state.current.path);
  const currentMarkdown = useDocsStore((state) => state.current.markdown);
  const previousPathRef = useRef<string | null>(null);
  const requestedPath = normalizeDocPathname(location.pathname);

  useEffect(() => {
    let cancelled = false;

    const syncCurrentDoc = async () => {
      const markdown = await useDocsStore.getState().setCurrent(requestedPath);

      if (cancelled || markdown || requestedPath === DEFAULT_DOC_PATH) {
        return;
      }

      navigate(toDocHref(DEFAULT_DOC_PATH), { replace: true });
    };

    void syncCurrentDoc();

    return () => {
      cancelled = true;
    };
  }, [navigate, requestedPath]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el || !currentPath || !currentMarkdown) return;
    if (previousPathRef.current === currentPath) return;

    const storedScroll = Number(
      sessionStorage.getItem(`${SCROLL_STORAGE_KEY_PREFIX}${currentPath}`) || "0"
    );

    el.scrollTo({
      top: storedScroll,
      left: 0,
      behavior: "auto",
    });
    previousPathRef.current = currentPath;
  }, [currentPath, currentMarkdown]);

  const handleScroll = () => {
    const el = mainRef.current;
    if (!el || !currentPath) return;

    sessionStorage.setItem(
      `${SCROLL_STORAGE_KEY_PREFIX}${currentPath}`,
      String(el.scrollTop)
    );
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
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<DocsRoute />} />
      </Routes>
    </div>
  );
}
