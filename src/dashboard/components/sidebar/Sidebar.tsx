import React, { useEffect, useRef, useState } from "react";
import type { DocNode } from "../../types/docfile.types";
import { Search, X } from "lucide-react";
import { SidebarTree } from "./SidebarTree";
import RetreeverIcon from "/images/retreever-icon-box.svg";
import { filterDocTree } from "../../service/DocSearch";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "../../../shared/MobileNavbar";
import { useLayoutStore } from "../../../store/useDocsStore";


const Sidebar: React.FC = () => {
  const [docTree, setDocTree] = useState<DocNode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for small/medium screens
  const navigate = useNavigate();
  const [hamOpen, setHamOpen] = useState(false);

  const filteredTree = filterDocTree(docTree, searchTerm);

  // Resize observer to track sidebar width
  const sidebarRef = useRef<HTMLInputElement>(null);
  const setSidebarWidth = useLayoutStore((s) => s.setSidebarWidth);

  useEffect(() => {
    // Fetch works in both dev + prod
    fetch('/doc-tree.json')
      .then(res => res.json())
      .then((data: DocNode[]) => setDocTree(data));
  }, []);
  
  useEffect(() => {
    if (!sidebarRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSidebarWidth(entry.contentRect.width);
    });

    observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  // Handlers
  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      // when clearing search on small screens, keep overlay state as is
      return;
    }
  };

  return (
    <>
      {/* Desktop / large screens: normal sidebar with filtering */}
      <aside
        className={`
          hidden lg:flex
          h-screen
          flex-col
          sticky top-0 overflow-auto
          border-r border-border-subtle
          bg-sidebar
        `}
        ref={sidebarRef}
      >
        <div className="mt-16 mb-4" />

        {/* Search */}
        <div className="px-5 pb-3 shrink-0">
          <div
            className="
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              border border-border-subtle
            "
          >
            <Search className="w-4 h-4 text-(--rt-fg-muted)" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              className="
                bg-transparent
                w-full
                text-sm
                text-(--rt-fg-light)
                placeholder-(--rt-fg-muted)
                outline-none
              "
            />
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-auto px-6 py-2 text-sm">
          <SidebarTree tree={filteredTree} highlight={searchTerm} />
        </div>
      </aside>

      {/* Small/medium screens: logo + search bar */}
      <div
        className="
          lg:hidden
          fixed
          w-full
          px-4 pt-4 pb-2
          bg-(--dark-5)
          border-b border-(--dark-border)/40
        "
      >
        <div className="flex items-center gap-3">
          <motion.a
            href="/"
            className="group flex items-center gap-2.5 select-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <motion.img
              src={RetreeverIcon}
              alt="Retreever"
              className="h-8 w-auto transition-opacity"
            />
          </motion.a>

          {/* Search bar */}
          <div
            className="
              flex items-center gap-2
              flex-1
              px-3 py-2
              rounded-lg
              border border-border-subtle
            "
          >
            <Search className="w-4 h-4 text-(--rt-fg-muted)" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={handleFocus}
              className="
                bg-transparent
                w-full
                text-sm
                text-(--rt-fg-light)
                placeholder-(--rt-fg-muted)
                outline-none
              "
            />
          </div>
          {!isOpen && (
            <MobileNavbar
              activeLink="/docs"
              isDocs={true}
              open={hamOpen}
              setOpen={setHamOpen}
              handleSectionClick={() => {
                setHamOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Overlay tree when search is active (mobile+tablet) */}
      {isOpen && (
        <div
          className="
            lg:hidden
            fixed inset-0 z-40
            bg-(--dark-5)
            text-(--rt-fg-light)
            flex flex-col
          "
        >
          {/* Header with search + close */}
          <div className="px-4 pt-4 pb-3 shrink-0 flex items-center gap-2">
            <div
              className="
                flex items-center gap-2
                flex-1
                px-3 py-2
                rounded-lg
                border border-(--dark-border-2)
              "
            >
              <Search className="w-4 h-4 text-(--rt-fg-muted)" />
              <input
                autoFocus
                type="text"
                placeholder="Search docs..."
                value={searchTerm}
                onChange={(e) => handleChange(e.target.value)}
                className="
                  bg-transparent
                  w-full
                  text-sm
                  text-(--rt-fg-light)
                  placeholder-(--rt-fg-muted)
                  outline-none
                "
              />
            </div>
            <motion.button
              className="z-50 flex h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              onClick={handleClose}
              aria-label="Toggle navigation"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen && (
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
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Full-screen tree (filtered) */}
          <div className="flex-1 overflow-auto px-4 pb-4 text-sm">
            <SidebarTree tree={filteredTree} highlight={searchTerm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
