import type { DocNode } from "../types/docfile.types";
import { extractTitle, prettifyName, toUrlPath } from "./FileNameFormatter";

export const markdownFiles = import.meta.glob("/docs/**/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

export function resolveDocs(): DocNode[] {
  const tree: Record<string, any> = {};

  // Track all folders that appear
  const allFolders = new Set<string>();

  // Scan through file paths to map folders
  for (const fullPath in markdownFiles) {
    const relative = fullPath.replace("/docs/", "");
    const parts = relative.split("/");

    // Build folder paths
    let folderPath = "";
    for (let i = 0; i < parts.length - 1; i++) {
      folderPath += (i === 0 ? "" : "/") + parts[i];
      allFolders.add(folderPath); // collect all folders
    }
  }

  // Ensure empty folders are created
  for (const folderPath of allFolders) {
    const parts = folderPath.split("/");

    let current = tree;
    parts.forEach((part) => {
      if (!current[part]) {
        current[part] = {
          type: "folder",
          name: prettifyName(part),
          children: {},
        };
      }
      current = current[part].children;
    });
  }

  // Now process markdown files
  for (const fullPath in markdownFiles) {
    const content = markdownFiles[fullPath] as string;
    const relative = fullPath.replace("/docs/", "");
    const parts = relative.split("/");

    let current = tree;

    parts.forEach((part) => {
      const isFile = part.endsWith(".md");
      const base = part.replace(".md", "");

      if (isFile) {
        const title = extractTitle(content, base);
        current[base] = {
          type: "file",
          name: prettifyName(base),
          title,
          _content: content,
        };
        return;
      }

      if (!current[part]) {
        current[part] = {
          type: "folder",
          name: prettifyName(part),
          children: {},
        };
      }

      current = current[part].children;
    });
  }

  // Convert to DocNode[] format
  function convert(obj: Record<string, any>, prefix = ""): DocNode[] {
    const result: DocNode[] = [];

    for (const key in obj) {
      const item = obj[key];

      if (item.type === "file") {
        result.push({
          ...item,
          path: `${prefix}${toUrlPath(key)}`,
        });
      } else {
        result.push({
          type: "folder",
          name: item.name,
          children: convert(
            item.children,
            `${prefix}${toUrlPath(key)}/`
          ),
        });
      }
    }

    // folders first, then files
    return result.sort((a, b) => {
      if (a.type === "folder" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;
      return a.name.localeCompare(b.name);
    });
  }

  return convert(tree);
}
