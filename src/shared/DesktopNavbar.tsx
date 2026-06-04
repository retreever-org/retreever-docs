import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RetreeverLogo from "/images/icon512v2.png";
import GitHubLogo from "/images/github.svg";
import { ChevronRight, CircleHelp, MessagesSquare, Play } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

interface DesktopNavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function DesktopNavbar({
  theme,
  onToggleTheme,
}: DesktopNavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const actionsMeasureRef = useRef<HTMLDivElement | null>(null);
  const [compactGithub, setCompactGithub] = useState(false);

  const githubClass =
    theme === "light"
      ? "border-primary-400 bg-primary-500 text-white shadow-none hover:bg-primary-500"
      : "border-primary-500/30 bg-primary-500/10 text-primary-100 hover:bg-primary-500/15";

  useEffect(() => {
    const navEl = navRef.current;
    const measureEl = actionsMeasureRef.current;
    if (!navEl || !measureEl) return;

    const updateCompactMode = () => {
      const navWidth = navEl.clientWidth;
      const fullActionsWidth = measureEl.clientWidth;
      setCompactGithub(fullActionsWidth > navWidth * 0.5);
    };

    updateCompactMode();

    const observer = new ResizeObserver(() => {
      updateCompactMode();
    });

    observer.observe(navEl);
    observer.observe(measureEl);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="static top-0 z-50 w-full border-b border-surface-500/40 bg-surface-700/70 backdrop-blur-xs"
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.a
            href="/"
            className="group flex items-center gap-2 select-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.img
              src={RetreeverLogo}
              alt="Retreever"
              className="h-7 w-7 rounded-md object-contain transition-opacity"
            />
            <span className="text-base font-bold tracking-tight text-text-primary">
              Retreever
            </span>
          </motion.a>

          <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-5 sm:gap-6">
          <div className="flex items-center gap-5 sm:gap-6">
            <motion.button
              type="button"
              aria-label="Help"
              title="Help"
              className="inline-flex items-center gap-2 text-sm font-medium text-surface-300 transition-all hover:text-text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <CircleHelp className="h-4 w-4" />
              <span className="hidden sm:inline">Help</span>
            </motion.button>

            <motion.button
              type="button"
              aria-label="Q and A"
              title="Q and A"
              className="inline-flex items-center gap-2 text-sm font-medium text-surface-300 transition-all hover:text-text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessagesSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Q&amp;A</span>
            </motion.button>

            <motion.a
              href="https://exp.retreever.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Retreever experience"
              title="Open Retreever experience"
              className="inline-flex items-center gap-2 text-sm font-medium text-surface-300 transition-all hover:text-primary-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Studio</span>
            </motion.a>
          </div>

          <motion.a
            href="https://github.com/Retreever-org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star on GitHub"
            className={[
              compactGithub
                ? "group relative inline-flex h-8 w-8 items-center justify-center text-text-primary transition-all hover:text-primary-400"
                : `group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all sm:px-5 ${githubClass}`,
            ].join(" ")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={GitHubLogo}
              alt="GitHub"
              className={`relative ${compactGithub ? "h-7 w-7" : "h-4 w-4"}`}
            />
            {!compactGithub && (
              <>
                <span className="relative font-mono text-[11px] uppercase tracking-widest sm:text-xs">
                  Star on GitHub
                </span>
                <ChevronRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </motion.a>
        </div>

        <div
          ref={actionsMeasureRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center opacity-0 sm:right-6"
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-surface-300">
              <CircleHelp className="h-4 w-4" />
              <span>Help</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-surface-300">
              <MessagesSquare className="h-4 w-4" />
              <span>Q&amp;A</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-surface-300">
              <Play className="h-4 w-4" />
              <span>Studio</span>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium sm:px-5 ${githubClass}`}
          >
            <img src={GitHubLogo} alt="" className="h-4 w-4" />
            <span className="font-mono text-[11px] uppercase tracking-widest sm:text-xs">
              Star on GitHub
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </nav>
  );
}
