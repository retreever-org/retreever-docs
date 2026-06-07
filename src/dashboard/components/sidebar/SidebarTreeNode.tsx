import { type MouseEvent, useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { DocNode } from "../../types/docfile.types";
import { DEFAULT_DOC_PATH, highlightText, toDocHref } from "../../service/DocSearch";
import { useDocsStore } from "../../../store/useDocsStore";

function getDisplayedNodeName(
  node: Extract<DocNode, { type: "file" }>
): string {
  const normalizedPath = node.path.replaceAll("\\", "/");

  if (
    node.name === "Get Started" &&
    normalizedPath.endsWith("/get-started") &&
    !normalizedPath.startsWith("spring-boot/")
  ) {
    return "Coming Soon...";
  }

  return node.name;
}

function containsPath(
  node: Extract<DocNode, { type: "folder" }>,
  path: string | null
): boolean {
  if (!path) return false;

  return node.children.some((child) => {
    if (child.type === "file") {
      return child.path === path;
    }

    return containsPath(child, path);
  });
}

interface FolderNodeProps {
  node: Extract<DocNode, { type: "folder" }>;
  depth: number;
  highlight?: string;
  compactMode?: boolean;
  pendingPath?: string | null;
  onPreviewSelect?: (path: string) => void;
  onConfirmSelect?: (path: string) => void;
}

export const FolderNode = ({
  node,
  depth,
  highlight,
  compactMode = false,
  pendingPath = null,
  onPreviewSelect,
  onConfirmSelect,
}: FolderNodeProps) => {
  const currentPath = useDocsStore((state) => state.current.path);
  const [open, setOpen] = useState(() => containsPath(node, currentPath));

  useEffect(() => {
    if (containsPath(node, currentPath)) {
      setOpen(true);
    }
  }, [currentPath, node]);

  return (
    <div className="select-none font-normal">
      <div
        className={`
          flex items-center gap-2
          cursor-pointer
          px-3 py-1
          rounded-md
          text-text-muted
          text-sm
          ${depth > 0 ? "pl-6" : ""}
          transition-colors
          hover:text-text-paragraph
        `}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
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
                  compactMode={compactMode}
                  pendingPath={pendingPath}
                  onPreviewSelect={onPreviewSelect}
                  onConfirmSelect={onConfirmSelect}
                />
              ) : (
                <FileNode
                  key={child.name + i}
                  node={child as Extract<DocNode, { type: "file" }>}
                  depth={depth + 1}
                  highlight={highlight}
                  compactMode={compactMode}
                  pendingPath={pendingPath}
                  onPreviewSelect={onPreviewSelect}
                  onConfirmSelect={onConfirmSelect}
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
  compactMode?: boolean;
  pendingPath?: string | null;
  onPreviewSelect?: (path: string) => void;
  onConfirmSelect?: (path: string) => void;
}

export const FileNode = ({
  node,
  depth,
  highlight,
  compactMode = false,
  pendingPath = null,
  onPreviewSelect,
  onConfirmSelect,
}: FileNodeProps) => {
  const navigate = useNavigate();
  const currentPath = useDocsStore((state) => state.current.path);
  const isActive = (currentPath || DEFAULT_DOC_PATH) === node.path;
  const isPending = pendingPath === node.path;
  const displayName = getDisplayedNodeName(node);

  const handleClick = () => {
    if (compactMode) {
      onPreviewSelect?.(node.path);
      return;
    }

    navigate(toDocHref(node.path));
  };

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (compactMode) {
      onConfirmSelect?.(node.path);
      return;
    }

    navigate(toDocHref(node.path));
  };

  return (
    <div
      className={`
        flex items-center gap-2
        rounded-md
        text-sm
        ${depth > 0 ? "pl-8" : "pl-3"}
        ${compactMode ? "py-1.5 pr-2" : "py-1"}
        ${isActive ? "text-primary-500 font-semibold" : "text-text-muted"}
        transition-colors
        ${isActive ? "" : "hover:text-text-paragraph"}
        font-normal
      `}
      title={displayName}
    >
      <button
        type="button"
        className="min-w-0 flex-1 cursor-pointer truncate text-left"
        onClick={handleClick}
      >
        {highlightText(displayName, highlight)}
      </button>
      {compactMode && isPending && (
        <button
          type="button"
          onClick={handleConfirm}
          className="shrink-0 rounded-md border border-primary-500/40 bg-primary-500/12 px-2.5 py-1 text-xs font-semibold text-primary-500 transition-colors hover:bg-primary-500/20"
        >
          Select
        </button>
      )}
    </div>
  );
};
