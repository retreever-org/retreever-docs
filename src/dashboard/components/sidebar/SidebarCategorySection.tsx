import type { DocNode } from "../../types/docfile.types";
import { FileNode, FolderNode } from "./SidebarTreeNode";
import { highlightText } from "../../service/DocSearch";

interface CategorySectionProps {
  node: Extract<DocNode, { type: "folder" }>;
  highlight?: string;
}

export const CategorySection = ({ node, highlight }: CategorySectionProps) => {
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
            />
          ) : (
            <FileNode
              key={child.name + i}
              node={child}
              depth={0}
              highlight={highlight}
            />
          )
        ))}
      </div>
    </div>
  );
};
