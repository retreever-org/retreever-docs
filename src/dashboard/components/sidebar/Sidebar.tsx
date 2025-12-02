import React, { useState } from "react";
import type { DocNode } from "../../types/docfile.types";
import { Search } from "lucide-react";
import { SidebarTree } from "./SidebarTree";

interface SidebarProps {
  tree: DocNode[];
  activeFile?: string; // pass current file name or id
}

const Sidebar: React.FC<SidebarProps> = ({ tree, activeFile }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // For now, search term is not filtering; you can plug it into tree filtering later.

  return (
    <aside
      className="
        w-72
        h-screen
        flex flex-col
        bg-(--dark-1)
        border-r border-(--dark-border)
        text-(--rt-fg-light)
      "
    >
      <div className="mt-16 mb-4 border-b border-(--dark-border)/50">{" "}</div>

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="flex-1 overflow-auto px-3 py-2 text-sm">
        <SidebarTree tree={tree} activeFile={activeFile} />
      </div>
    </aside>
  );
};

export default Sidebar;
