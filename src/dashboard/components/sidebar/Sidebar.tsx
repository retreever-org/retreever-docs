import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarTree } from "./SidebarTree";
import { filterDocTree } from "../../service/DocSearch";
import {
  useDocTree,
  useLayoutStore,
} from "../../../store/useDocsStore";
import { toDocHref } from "../../service/DocSearch";

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const { tree, load } = useDocTree();
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

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
      return;
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setPendingPath(null);
  };

  const handlePreviewSelect = (path: string) => {
    setPendingPath(path);
  };

  const handleConfirmSelect = async (path: string) => {
    navigate(toDocHref(path));
    setPendingPath(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop / large screens: normal sidebar with filtering */}
      <aside
        className={`
          pt-4
          hidden lg:flex
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
          fixed left-0 right-0 top-12 z-40
          w-full
          border-b border-surface-500/40
          bg-surface-700
        "
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            type="button"
            onClick={handleToggle}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-surface-500/40 bg-surface-900/20 text-text-primary transition-colors hover:bg-surface-900/30"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

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
        {isOpen && (
          <div className="max-h-[70vh] overflow-auto border-t border-surface-500/20 px-4 pb-4 text-sm">
            <div className="pt-3">
              <SidebarTree
                tree={filteredTree}
                highlight={searchTerm}
                compactMode
                pendingPath={pendingPath}
                onPreviewSelect={handlePreviewSelect}
                onConfirmSelect={handleConfirmSelect}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
