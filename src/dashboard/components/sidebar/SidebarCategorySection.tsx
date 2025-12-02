import type { DocNode } from "../../types/docfile.types";
import { FileNode, FolderNode } from "./SidebarTreeNode";
import { highlightText } from "../../service/DocSearch";

interface CategorySectionProps {
  node: Extract<DocNode, { type: "folder" }>;
  activeFile?: string;
  highlight?: string;
}

export const CategorySection = ({ node, activeFile, highlight }: CategorySectionProps) => {
  const children = node.children;

  const files = children.filter(
    (c) => c.type === "file"
  ) as Extract<DocNode, { type: "file" }>[];
  const folders = children.filter(
    (c) => c.type === "folder"
  ) as Extract<DocNode, { type: "folder" }>[];

  const intro = files.find((f) => f.name === "Introduction");
  const gettingStarted = files.find((f) => f.name === "Getting Started");
  const otherFiles = files
    .filter((f) => f !== intro && f !== gettingStarted)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      <div className="px-3 text-base font-semibold text-(--rt-fg-light)">
        {highlightText(node.name, highlight)}
      </div>

      <div className="space-y-1">
        {intro && (
          <FileNode
            key={intro.name}
            node={intro}
            depth={0}
            active={activeFile === intro.name}
            highlight={highlight}
          />
        )}
        {gettingStarted && (
          <FileNode
            key={gettingStarted.name}
            node={gettingStarted}
            depth={0}
            active={activeFile === gettingStarted.name}
            highlight={highlight}
          />
        )}
        {otherFiles.map((file) => (
          <FileNode
            key={file.name}
            node={file}
            depth={0}
            active={activeFile === file.name}
            highlight={highlight}
          />
        ))}

        {folders.map((folder, i) => (
          <FolderNode
            key={folder.name + i}
            node={folder}
            depth={0}
            activeFile={activeFile}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
};
