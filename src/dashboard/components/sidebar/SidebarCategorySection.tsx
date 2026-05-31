import type { DocNode } from "../../types/docfile.types";
import { FileNode, FolderNode } from "./SidebarTreeNode";
import { highlightText } from "../../service/DocSearch";

interface CategorySectionProps {
  node: Extract<DocNode, { type: "folder" }>;
  highlight?: string;
  compactMode?: boolean;
  pendingPath?: string | null;
  onPreviewSelect?: (path: string) => void;
  onConfirmSelect?: (path: string) => void;
}

export const CategorySection = ({
  node,
  highlight,
  compactMode = false,
  pendingPath = null,
  onPreviewSelect,
  onConfirmSelect,
}: CategorySectionProps) => {
  const children = node.children;

  return (
    <div className="space-y-1">
      <div className="px-3 text-base font-semibold text-text-primary">
        {highlightText(node.name, highlight)}
      </div>

      <div className="space-y-1">
        {children.map((child, i) => (
          child.type === "folder" ? (
            <FolderNode
              key={child.name + i}
              node={child}
              depth={0}
              highlight={highlight}
              compactMode={compactMode}
              pendingPath={pendingPath}
              onPreviewSelect={onPreviewSelect}
              onConfirmSelect={onConfirmSelect}
            />
          ) : (
            <FileNode
              key={child.name + i}
              node={child}
              depth={0}
              highlight={highlight}
              compactMode={compactMode}
              pendingPath={pendingPath}
              onPreviewSelect={onPreviewSelect}
              onConfirmSelect={onConfirmSelect}
            />
          )
        ))}
      </div>
    </div>
  );
};
