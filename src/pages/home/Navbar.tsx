import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RetreeverLogo from "/retreever-plain-light-logo.svg";
import GitHubLogo from "/github.svg";
import { useNavigate } from "react-router-dom";

const LOGO_BLUE = "#3B8BFF";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDocs = activeLink.startsWith("/docs");

  // Scroll to a section on the page or navigate for routes
  const handleSectionClick = (href: string) => {
    setActiveLink(href);
    setOpen(false);
    if (href === "/docs") {
      navigate("/docs");
    } else {
      // Scroll smoothly for internal sections like Home and Features
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/80 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="/"
            className="group flex items-center gap-2.5 select-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick("/");
            }}
          >
            <motion.img
              src={RetreeverLogo}
              alt="Retreever"
              className="h-10 w-auto transition-opacity"
            />
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              <NavLink
                href="#home"
                active={activeLink === "#home" || activeLink === "/"}
                onClick={() => handleSectionClick("#home")}
              >
                Home
              </NavLink>
              <NavLink
                href="#features"
                active={activeLink === "#features"}
                onClick={() => handleSectionClick("#features")}
              >
                Features
              </NavLink>
              <NavLink
                href="/docs"
                active={isDocs}
                onClick={() => handleSectionClick("/docs")}
              >
                Docs
              </NavLink>
            </div>

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

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-1">
              <MobileNavLink
                href="#home"
                active={activeLink === "#home" || activeLink === "/"}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick("#home");
                }}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/docs"
                active={isDocs}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick("/docs");
                }}
              >
                Docs
              </MobileNavLink>
              <MobileNavLink
                href="#features"
                active={activeLink === "#features"}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick("#features");
                }}
              >
                Features
              </MobileNavLink>

              <motion.a
                href="https://github.com/Retreever-org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm font-medium text-blue-200"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                <img src={GitHubLogo} alt="GitHub" className="h-5 w-5" />
                <span>View source on GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}
function NavLink({ href, active, onClick, children }: NavLinkProps) {
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
          active ? "text-white" : "text-slate-400 hover:text-white"
        }`}
      >
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

interface MobileNavLinkProps {
  href: string;
  active: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}
function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: MobileNavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-blue-500/10 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {active && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: LOGO_BLUE }}
          />
        )}
      </div>
    </motion.a>
  );
}
