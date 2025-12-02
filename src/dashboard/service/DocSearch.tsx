import type { DocFile, DocFolder, DocNode } from "../types/docfile.types";

const normalize = (value: string) => value.toLowerCase();

const matchesFile = (file: DocFile, term: string) => {
  const t = normalize(term);
  return (
    normalize(file.name).includes(t) ||
    normalize(file.title).includes(t) ||
    normalize(file.path).includes(t)
  );
};

const matchesFolder = (folder: DocFolder, term: string) => {
  const t = normalize(term);
  return normalize(folder.name).includes(t);
};

export function filterDocTree(tree: DocNode[], search: string): DocNode[] {
  const trimmed = search.trim();
  if (!trimmed) return tree;

  const term = trimmed.toLowerCase();

  const recurse = (node: DocNode): DocNode | null => {
    if (node.type === "file") {
      return matchesFile(node, term) ? node : null;
    }

    // folder
    const filteredChildren: DocNode[] = [];
    for (const child of node.children) {
      const result = recurse(child);
      if (result) filteredChildren.push(result);
    }

    const folderMatches = matchesFolder(node, term);

    if (folderMatches || filteredChildren.length > 0) {
      // return a new folder node with filtered children
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  };

  const result: DocNode[] = [];
  for (const node of tree) {
    const filtered = recurse(node);
    if (filtered) result.push(filtered);
  }

  return result;
}


export const highlightText = (text: string, highlight?: string) => {
  const termRaw = highlight?.trim();
  if (!termRaw) return <span className="truncate">{text}</span>;

  const lowerText = text.toLowerCase();
  const lowerTerm = termRaw.toLowerCase();

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  while (true) {
    const matchIndex = lowerText.indexOf(lowerTerm, currentIndex);
    if (matchIndex === -1) {
      if (currentIndex < text.length) {
        parts.push(
          <span key={currentIndex} className="truncate">
            {text.slice(currentIndex)}
          </span>
        );
      }
      break;
    }

    if (matchIndex > currentIndex) {
      parts.push(
        <span key={currentIndex} className="truncate">
          {text.slice(currentIndex, matchIndex)}
        </span>
      );
    }

    const matchText = text.slice(matchIndex, matchIndex + lowerTerm.length);
    parts.push(
      <span
        key={matchIndex}
        className="bg-blue-200/30 text-blue-100/90 rounded-[3px]"
      >
        {matchText}
      </span>
    );

    currentIndex = matchIndex + lowerTerm.length;
  }

  return <span className="truncate">{parts}</span>;
};