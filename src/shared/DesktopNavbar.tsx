import { motion } from "framer-motion";
import RetreeverLogo from "/images/icon512v2.png";
import GitHubLogo from "/images/github.svg";
import { ChevronRight } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

interface DesktopNavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function DesktopNavbar({
  theme,
  onToggleTheme,
}: DesktopNavbarProps) {
  const githubClass =
    theme === "light"
      ? "border-primary-400 bg-primary-500 text-white shadow-none hover:bg-primary-500"
      : "border-primary-500/30 bg-primary-500/10 text-primary-100 hover:bg-primary-500/15";

  return (
    <nav className="static top-0 z-50 w-full border-b border-surface-500/40 bg-surface-700/70 backdrop-blur-xs">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
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

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />

          <motion.a
            href="https://github.com/Retreever-org"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all sm:px-5 ${githubClass}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={GitHubLogo} alt="GitHub" className="relative h-4 w-4" />
            <span className="relative font-mono text-[11px] uppercase tracking-widest sm:text-xs">
              Star on GitHub
            </span>
            <ChevronRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </div>
      </div>
    </nav>
  );
}
