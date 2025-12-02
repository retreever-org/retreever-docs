// SidebarTreeNode.tsx
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DocNode } from "../../types/docfile.types";
import { highlightText } from "../../service/DocSearch";
import { useLocation, useNavigate } from "react-router-dom";

interface FolderNodeProps {
  node: Extract<DocNode, { type: "folder" }>;
  depth: number;
  highlight?: string;
}

export const FolderNode = ({ node, depth, highlight }: FolderNodeProps) => {
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
        {highlightText(node.name, highlight)}
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
                  highlight={highlight}
                />
              ) : (
                <FileNode
                  key={child.name + i}
                  node={child as Extract<DocNode, { type: "file" }>}
                  depth={depth + 1}
                  highlight={highlight}
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
  highlight?: string;
}

export const FileNode = ({ node, depth, highlight }: FileNodeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\/docs\//, "");
  const isActive = currentPath === node.path;

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
        ${isActive ? "text-(--rt-blue-1) font-semibold" : "text-(--rt-fg-muted)"}
        transition-colors
        ${isActive ? "" : "hover:text-(--rt-fg-subtle)"}
        font-normal
      `}
      title={node.name}
      onClick={() => navigate(`/docs/${node.path}`)}
    >
      {highlightText(node.name, highlight)}
    </div>
  );
};
