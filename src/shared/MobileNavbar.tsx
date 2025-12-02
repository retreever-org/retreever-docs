import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GitHubLogo from "/github.svg";
import { type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const LOGO_BLUE = "#3B8BFF";

interface MobileNavbarProps {
  isDocs: boolean;
  activeLink: string;
  handleSectionClick: (href: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNavbar({
  isDocs,
  activeLink,
  handleSectionClick,
  open,
  setOpen,
}: MobileNavbarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* FAB-style toggle button (always visible on mobile) */}
      <motion.button
        className="z-50 flex h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
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
              className="flex h-full w-full items-center justify-center"
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
              className="flex h-full w-full items-center justify-center"
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fullscreen mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black/60 backdrop-blur-xl md:hidden"
          >
            {/* Top content: links + GitHub */}
            <div className="px-6 pt-12 pb-4 space-y-1 mt-6">
              {!isDocs ? (
                <>
                  <MobileNavLink
                    href="#home"
                    active={activeLink === "#home" || activeLink === "/"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("#home");
                      setOpen(false);
                    }}
                  >
                    Home
                  </MobileNavLink>

                  <MobileNavLink
                    href="#features"
                    active={activeLink === "#features"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("#features");
                      setOpen(false);
                    }}
                  >
                    Features
                  </MobileNavLink>

                  <MobileNavLink
                    href="/docs"
                    active={isDocs}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick("/docs");
                      setOpen(false);
                    }}
                  >
                    Docs
                  </MobileNavLink>
                </>
              ) : (
                <MobileNavLink
                  href="/"
                  active={isDocs}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  Home
                </MobileNavLink>
              )}

              <motion.a
                href="https://github.com/Retreever-org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm font-medium text-blue-200"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                <img src={GitHubLogo} alt="GitHub" className="h-5 w-5" />
                <span>View source on GitHub</span>
              </motion.a>
            </div>

            {/* Bottom spacer so content doesn’t clash with button */}
            <div className="h-16" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface MobileNavLinkProps {
  href: string;
  active: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
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
          ? "bg-blue-500/5 backdrop-blur-2xl text-white"
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
