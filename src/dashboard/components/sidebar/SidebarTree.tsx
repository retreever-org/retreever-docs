import type { DocNode } from "../../types/docfile.types";
import { CategorySection } from "./SidebarCategorySection";
import { FileNode, FolderNode } from "./SidebarTreeNode";

interface SidebarTreeProps {
  tree: DocNode[];
  activeFile?: string; // e.g. file name or full path
}

export const SidebarTree = ({ tree, activeFile }: SidebarTreeProps) => {
  if (!tree || tree.length === 0) return null;

  const firstFolder = tree.find((n) => n.type === "folder") as
    | Extract<DocNode, { type: "folder" }>
    | undefined;
  const rest = tree.filter((n) => n !== firstFolder);

  const files = rest.filter((n) => n.type === "file") as Extract<
    DocNode,
    { type: "file" }
  >[];
  const folders = rest.filter((n) => n.type === "folder") as Extract<
    DocNode,
    { type: "folder" }
  >[];

  const intro = files.find((f) => f.name === "Introduction");
  const gettingStarted = files.find((f) => f.name === "Getting Started");
  const otherFiles = files
    .filter((f) => f !== intro && f !== gettingStarted)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-1">
      {/* 1) Top-level files at top */}
      {intro && (
        <FileNode
          key={intro.name}
          node={intro}
          depth={0}
          active={activeFile === intro.name}
        />
      )}
      {gettingStarted && (
        <FileNode
          key={gettingStarted.name}
          node={gettingStarted}
          depth={0}
          active={activeFile === gettingStarted.name}
        />
      )}
      {otherFiles.map((file) => (
        <FileNode
          key={file.name}
          node={file}
          depth={0}
          active={activeFile === file.name}
        />
      ))}

      {/* 2) Category from first folder */}
      {firstFolder && (
        <div className="mt-7">
          <CategorySection node={firstFolder} activeFile={activeFile} />
        </div>
      )}

      {/* 3) Remaining folders after that */}
      {folders.map((folder) => (
        <FolderNode
          key={folder.name}
          node={folder}
          depth={0}
          activeFile={activeFile}
        />
      ))}
    </div>
  );
};

