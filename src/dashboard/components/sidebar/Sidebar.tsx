import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SidebarTree } from "./SidebarTree";
import { filterDocTree } from "../../service/DocSearch";
import { AnimatePresence, motion } from "framer-motion";
import { useDocTree, useLayoutStore } from "../../../store/useDocsStore";


const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for small/medium screens
  const {tree, load} = useDocTree();
  const filteredTree = useMemo(
    () => filterDocTree(tree, searchTerm),
    [tree, searchTerm]
  );

  // Resize observer to track sidebar width
  const sidebarRef = useRef<HTMLInputElement>(null);
  const setSidebarWidth = useLayoutStore((s) => s.setSidebarWidth);

  useEffect(() => {
    load();
  }, [load]);
  
  useEffect(() => {
    if (!sidebarRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setSidebarWidth(entry.contentRect.width);
    });

    observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, [setSidebarWidth]);

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
          pt-4
          hidden md:flex
          h-screen
          flex-col
          sticky top-0 overflow-auto
          border-r border-surface-500/20
          bg-surface-700
        `}
        ref={sidebarRef}
      >
        {/* Search */}
        <div className="px-5 shrink-0">
          <div
              className="
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              border border-surface-500/40
            "
          >
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              className="
                bg-transparent
                w-full
                text-sm
                text-text-primary
                placeholder-text-muted
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
          top-16
          w-full
          px-4 pt-4 pb-2
          bg-surface-700
          border-b border-surface-500/40
        "
      >
        <div className="flex items-center gap-3">
          <div className="group flex items-center gap-2 select-none">
            <div className="h-7 w-7 rounded-md bg-surface-900/20 border border-surface-500/20" />
            <span className="hidden text-sm font-bold tracking-tight text-text-primary min-[420px]:inline">
              Retreever Docs
            </span>
          </div>

          {/* Search bar */}
          <div
            className="
              flex items-center gap-2
              flex-1
              px-3 py-2
              rounded-lg
              border border-surface-500/40
            "
          >
            <Search className="w-4 h-4 text-text-muted" />
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
                text-text-primary
                placeholder-text-muted
                outline-none
              "
            />
          </div>
        </div>
      </div>

      {/* Overlay tree when search is active (mobile+tablet) */}
      {isOpen && (
        <div
          className="
            lg:hidden
            fixed inset-0 z-[60]
            bg-surface-700
            text-text-primary
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
                border border-surface-500/40
              "
            >
              <Search className="w-4 h-4 text-text-muted" />
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
                  text-text-primary
                  placeholder-text-muted
                  outline-none
                "
              />
            </div>
            <motion.button
            className="z-50 flex h-10 w-10 rounded-lg border border-surface-500/40 bg-surface-900/20 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-900/30"
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
