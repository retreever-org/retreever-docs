import React, { useState } from "react";
import type { DocNode } from "../../types/docfile.types";
import { Search, X } from "lucide-react";
import { SidebarTree } from "./SidebarTree";
import RetreeverIcon from "/retreever-icon-box.svg";
import { filterDocTree } from "../../service/DocSearch";

interface SidebarProps {
  tree: DocNode[];
  activeFile?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ tree, activeFile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // for small/medium screens

  const filteredTree = filterDocTree(tree, searchTerm);

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
        className="
          hidden lg:flex
          w-72
          h-screen
          flex-col
          bg-(--dark-5)
          border-r border-(--dark-border)/50
          text-(--rt-fg-light)
        "
      >
        <div className="mt-16 mb-4" />

        {/* Search */}
        <div className="px-5 pb-3 shrink-0">
          <div
            className="
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              border border-(--dark-border-2)
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
          <SidebarTree
            tree={filteredTree}
            activeFile={activeFile}
            highlight={searchTerm}
          />
        </div>
      </aside>

      {/* Small/medium screens: logo + search bar */}
      <div
        className="
          lg:hidden
          w-full
          px-4 pt-4 pb-2
          bg-(--dark-5)
          border-b border-(--dark-border)/40
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-auto items-center">
            <img
              src={RetreeverIcon}
              alt="Retreever logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Search bar */}
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
            <button
              onClick={handleClose}
              className="
                ml-2 p-2 rounded-full
                text-(--rt-fg-muted)
              "
              aria-label="Close docs navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Full-screen tree (filtered) */}
          <div className="flex-1 overflow-auto px-4 pb-4 text-sm">
            <SidebarTree
              tree={filteredTree}
              activeFile={activeFile}
              highlight={searchTerm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
