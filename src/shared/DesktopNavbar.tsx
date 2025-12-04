import { motion } from "framer-motion";
import RetreeverLogo from "/images/Retreever-logo-dark.svg";
import GitHubLogo from "/images/github.svg";
import { ChevronRight } from "lucide-react";
import { type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface DesktopNavbarProps {
  isDocs: boolean;
  activeLink: string;
  handleSectionClick: (href: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DesktopNavbar({
  isDocs,
  activeLink,
  handleSectionClick,
}: DesktopNavbarProps) {
  const navigate = useNavigate();

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        isDocs
          ? "border-border-subtle bg-navbar"
          : "border-transparent bg-transparent"
      }`}
      initial={window.location.pathname === "/" ? { y: -100 } : { y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={`transition-all duration-300`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-0">
          {/* Logo */}
          <motion.a
            href="/"
            className="group flex items-center select-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <motion.img
              src={RetreeverLogo}
              alt="Retreever"
              className="h-10 w-auto transition-opacity"
            />
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 py-2.5">
            {!isDocs && (
              <div className="flex items-center gap-1">
                <NavLink
                  href="#home"
                  active={activeLink === "#home" || activeLink === "/"}
                  onClick={() => handleSectionClick("#home")}
                  isDocs={false}
                >
                  Home
                </NavLink>
                <NavLink
                  href="#features"
                  active={activeLink === "#features"}
                  onClick={() => handleSectionClick("#features")}
                  isDocs={false}
                >
                  Features
                </NavLink>
                <NavLink
                  href="/docs"
                  active={isDocs}
                  onClick={() => navigate("/docs")}
                  isDocs={false}
                >
                  Docs
                </NavLink>
              </div>
            )}

            {isDocs && (
              <div className="flex items-center gap-1">
                <NavLink
                  href="/"
                  active={!isDocs}
                  onClick={() => navigate("/")}
                  isDocs={true}
                >
                  Home
                </NavLink>
                <NavLink
                  href="/docs"
                  active={isDocs}
                  onClick={() => navigate("/docs")}
                  isDocs={true}
                >
                  Docs
                </NavLink>
              </div>
            )}

            {/* GitHub CTA */}
            <motion.a
              href="https://github.com/Retreever-org"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-5 py-2 text-sm font-medium text-blue-200 transition-all hover:border-blue-500/40 hover:bg-blue-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <img src={GitHubLogo} alt="GitHub" className="relative h-4 w-4" />
              <span className="relative font-mono text-xs uppercase tracking-widest">
                Star on GitHub
              </span>
              <ChevronRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  isDocs?: boolean;
}

function NavLink({ href, active, onClick, children, isDocs }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
      className="relative px-4 py-2 text-sm font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className={`relative z-10 transition-colors ${
          active ? "text-text-primary" : "text-slate-400 hover:text-text-primary"
        }`}
      >
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeNav"
          className={`${!isDocs && "absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm"}`}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}
