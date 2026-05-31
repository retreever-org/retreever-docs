import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

interface ThemeToggleButtonProps {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggleButton({
  theme,
  onToggle,
  className = "",
}: ThemeToggleButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "light"}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-surface-500/40 bg-surface-700 text-text-primary transition-colors hover:bg-surface-700 ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.18 }}
        className="inline-flex"
      >
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </motion.span>
    </motion.button>
  );
}
