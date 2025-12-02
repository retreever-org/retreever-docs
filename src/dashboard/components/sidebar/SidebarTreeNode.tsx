// SidebarTreeNode.tsx
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DocNode } from "../../types/docfile.types";

interface FolderNodeProps {
  node: Extract<DocNode, { type: "folder" }>;
  depth: number;
  activeFile?: string;
}

export const FolderNode = ({ node, depth, activeFile }: FolderNodeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-none font-normal">
      <div
        className={`
          flex items-center gap-2
          cursor-pointer
          px-3 py-1
          rounded-md
          text-(--rt-fg-muted)
          text-sm
          ${depth > 0 ? "pl-6" : ""}
          transition-colors
          hover:text-(--rt-fg-subtle)
        `}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-(--rt-fg-muted)" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-(--rt-fg-muted)" />
        )}
        <span>{node.name}</span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="pl-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child, i) =>
              child.type === "folder" ? (
                <FolderNode
                  key={child.name + i}
                  node={child}
                  depth={depth + 1}
                  activeFile={activeFile}
                />
              ) : (
                <FileNode
                  key={child.name + i}
                  node={child as Extract<DocNode, { type: "file" }>}
                  depth={depth + 1}
                  active={activeFile === child.name}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FileNodeProps {
  node: Extract<DocNode, { type: "file" }>;
  depth: number;
  active?: boolean;
}

export const FileNode = ({ node, depth, active }: FileNodeProps) => {
  return (
    <div
      className={`
        flex items-center gap-2
        cursor-pointer
        px-3 py-1
        rounded-md
        text-sm
        truncate
        ${depth > 0 ? "pl-8" : "pl-3"}
        ${active ? "text-(--rt-blue-1)" : "text-(--rt-fg-muted)"}
        transition-colors
        hover:text-(--rt-fg-subtle)
        font-normal
      `}
      title={node.name}
    >
      <span className="truncate">{node.name}</span>
    </div>
  );
};
