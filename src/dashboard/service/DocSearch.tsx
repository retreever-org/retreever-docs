import type { DocFile, DocNode } from "../types/docfile.types";

export const DEFAULT_DOC_PATH = "spring-boot/get-started";
const DOC_ROUTE_PREFIXES = new Set([
  "spring-boot",
  "nestjs",
  "expressjs",
  "fastapi",
  "django",
  "asp-net",
  "gin",
  "contribution",
]);

export function normalizeDocPathname(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  return trimmed || DEFAULT_DOC_PATH;
}

export function toDocHref(path: string): string {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return `/${normalized || DEFAULT_DOC_PATH}`;
}

export function resolveDocLinkPath(
  href: string,
  currentPath: string | null = DEFAULT_DOC_PATH
): string | null {
  if (
    !href ||
    href.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(href) ||
    href.startsWith("//")
  ) {
    return null;
  }

  try {
    const base = new URL(
      toDocHref(currentPath || DEFAULT_DOC_PATH),
      "https://retreever.dev"
    );
    const url = new URL(href, base);

    if (url.search || url.hash) {
      return null;
    }

    const normalizedPath = normalizeDocPathname(url.pathname).replace(
      /\.md$/i,
      ""
    );
    const [prefix] = normalizedPath.split("/");

    if (!DOC_ROUTE_PREFIXES.has(prefix)) {
      return null;
    }

    return normalizedPath;
  } catch {
    return null;
  }
}

const normalize = (value: string) => value.toLowerCase();

const matchesFile = (file: DocFile, term: string) => {
  if (file.hidden) return false;

  const t = normalize(term);
  return (
    normalize(file.name).includes(t) ||
    normalize(file.title).includes(t) ||
    normalize(file.path).includes(t)
  );
};

export function findDocByPath(
  tree: DocNode[],
  path: string | null
): DocFile | null {
  if (!path) return null;

  for (const node of tree) {
    if (node.type === "file") {
      if (node.path === path) return node;
      continue;
    }

    const match = findDocByPath(node.children, path);
    if (match) return match;
  }

  return null;
}

export function excludeHiddenDocs(tree: DocNode[]): DocNode[] {
  const result: DocNode[] = [];

  for (const node of tree) {
    if (node.type === "file") {
      if (!node.hidden) {
        result.push(node);
      }
      continue;
    }

    const visibleChildren = excludeHiddenDocs(node.children);
    if (visibleChildren.length > 0) {
      result.push({
        ...node,
        children: visibleChildren,
      });
    }
  }

  return result;
}

export function filterDocTree(tree: DocNode[], search: string): DocNode[] {
  const visibleTree = excludeHiddenDocs(tree);
  const trimmed = search.trim();
  if (!trimmed) return visibleTree;

  const term = trimmed.toLowerCase();

  const recurse = (node: DocNode): DocNode | null => {
    if (node.type === "file") {
      return matchesFile(node, term) ? node : null;
    }

    const filteredChildren: DocNode[] = [];
    for (const child of node.children) {
      const result = recurse(child);
      if (result) filteredChildren.push(result);
    }

    if (filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  };

  const result: DocNode[] = [];
  for (const node of visibleTree) {
    const filtered = recurse(node);
    if (filtered) result.push(filtered);
  }

  return result;
}

export async function getMarkdown(filePath: string): Promise<string | null> {
  if (!filePath) {
    filePath = DEFAULT_DOC_PATH;
  }

  try {
    // Fetch from /docs/{path}.md
    const response = await fetch(`/markdown/${filePath}.md`);
    
    if (!response.ok) {
      console.warn(`Markdown file not found: /markdown/${filePath}.md`);
      return null;
    }

    const content = await response.text();
    
    // Remove frontmatter (same logic as before)
    return content.replace(/^---[\s\S]*?---\s*/, "");
  } catch (error) {
    console.error(`Failed to fetch ${filePath}:`, error);
    return null;
  }
}



export const highlightText = (text: string, highlight?: string) => {
  void highlight;
  return <span className="truncate">{text}</span>;
};
