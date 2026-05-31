import type { DocNode } from "../../types/docfile.types";
import { CategorySection } from "./SidebarCategorySection";
import { FileNode } from "./SidebarTreeNode";

interface SidebarTreeProps {
  tree: DocNode[];
  highlight?: string;
  compactMode?: boolean;
  pendingPath?: string | null;
  onPreviewSelect?: (path: string) => void;
  onConfirmSelect?: (path: string) => void;
}

export const SidebarTree = ({
  tree,
  highlight,
  compactMode = false,
  pendingPath = null,
  onPreviewSelect,
  onConfirmSelect,
}: SidebarTreeProps) => {
  if (!tree || tree.length === 0) return null;

  const topLevelFolders = tree.filter((n): n is Extract<DocNode, { type: "folder" }> => n.type === "folder");
  const topLevelFiles = tree.filter((n): n is Extract<DocNode, { type: "file" }> => n.type === "file");

  const intro = topLevelFiles.find((f) => f.name === "Introduction");
  const gettingStarted = topLevelFiles.find((f) => f.name === "Getting Started");
  const otherFiles = topLevelFiles
    .filter((f) => f !== intro && f !== gettingStarted)
    .sort((a, b) => a.name.localeCompare(b.name));

  const categoryRank = (name: string) => {
    if (name === "Spring Boot") return 0;
    if (name === "Contribution") return 999;
    return 100;
  };

  const categories = [...topLevelFolders].sort((a, b) => {
    const rankDiff = categoryRank(a.name) - categoryRank(b.name);
    if (rankDiff !== 0) return rankDiff;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-1">
      {/* 1) Top-level files at top */}
      {intro && (
        <FileNode
          key={intro.name}
          node={intro}
          depth={0}
          highlight={highlight}
          compactMode={compactMode}
          pendingPath={pendingPath}
          onPreviewSelect={onPreviewSelect}
          onConfirmSelect={onConfirmSelect}
        />
      )}
      {gettingStarted && (
        <FileNode
          key={gettingStarted.name}
          node={gettingStarted}
          depth={0}
          highlight={highlight}
          compactMode={compactMode}
          pendingPath={pendingPath}
          onPreviewSelect={onPreviewSelect}
          onConfirmSelect={onConfirmSelect}
        />
      )}
      {otherFiles.map((file) => (
        <FileNode
          key={file.name}
          node={file}
          depth={0}
          highlight={highlight}
          compactMode={compactMode}
          pendingPath={pendingPath}
          onPreviewSelect={onPreviewSelect}
          onConfirmSelect={onConfirmSelect}
        />
      ))}

      {/* 2) Top-level category sections */}
      {categories.map((folder, index) => (
        <div key={folder.name + index} className="mt-6">
          <CategorySection
            node={folder}
            highlight={highlight}
            compactMode={compactMode}
            pendingPath={pendingPath}
            onPreviewSelect={onPreviewSelect}
            onConfirmSelect={onConfirmSelect}
          />
        </div>
      ))}
    </div>
  );
};
