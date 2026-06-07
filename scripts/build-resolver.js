import fs from "node:fs";
import path from "node:path";
import glob from "fast-glob";

export async function resolveDocsBuild() {
  const docsDir = path.resolve(process.cwd(), "public/markdown");

  // Get all .md files
  const markdownFiles = await glob("**/*.md", {
    cwd: docsDir,
    absolute: false,
  });

  if (markdownFiles.length === 0) {
    console.warn("⚠️ No Markdown files found in public/markdown/");
    return [];
  }

  const tree = {};
  const allFolders = new Set();

  // Build folder structure
  for (const relative of markdownFiles) {
    const parts = relative.split("/");

    let folderPath = "";
    for (let i = 0; i < parts.length - 1; i++) {
      folderPath += (i === 0 ? "" : "/") + parts[i];
      allFolders.add(folderPath);
    }
  }

  // Create empty folders first
  for (const folderPath of allFolders) {
    const parts = folderPath.split("/");
    let current = tree;

    for (const part of parts) {
      if (!current[part]) {
        current[part] = {
          type: "folder",
          name: prettifyName(part),
          children: {},
        };
      }
      current = current[part].children;
    }
  }

  // Add files with content
  for (const relative of markdownFiles) {
    const filePath = path.join(docsDir, relative);
    const content = fs.readFileSync(filePath, "utf-8");
    const parts = relative.split("/");
    const base = parts[parts.length - 1].replace(".md", "");

    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]].children;
    }

    const title = extractTitle(content, base);
    current[base] = {
      type: "file",
      name: prettifyName(base),
      title,
      hidden: isHiddenDoc(relative),
    };
  }

  // Convert to DocNode[] shape
  const docOrder = new Map([
    ["spring-boot/get-started", 1],
    ["spring-boot/security", 2],
    ["spring-boot/studio-storage", 3],
    ["spring-boot/skip-endpoints", 4],
    ["spring-boot/runtime-endpoints", 5],
    ["spring-boot/annotations", 6],
    ["spring-boot/headers-metadata", 7],
    ["spring-boot/environment-automation", 8],
    ["nestjs/get-started", 9],
    ["expressjs/get-started", 10],
    ["fastapi/get-started", 11],
    ["django/get-started", 12],
    ["asp-net/get-started", 13],
    ["gin/get-started", 14],
  ]);

  const folderOrder = new Map([
    ["Spring Boot", 0],
    ["NestJS", 1],
    ["ExpressJS", 2],
    ["FastAPI", 3],
    ["Django", 4],
    ["ASP.NET", 5],
    ["Gin", 6],
    ["Contribution", 999],
  ]);

  function sortRank(node) {
    if (node.type === "file") {
      return docOrder.get(node.path) ?? 100;
    }
    return folderOrder.get(node.name) ?? 100;
  }

  function convert(obj, prefix = "") {
    const result = [];

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
          children: convert(item.children, `${prefix}${toUrlPath(key)}/`),
        });
      }
    }

    return result.sort((a, b) => {
      const rankDiff = sortRank(a) - sortRank(b);
      if (rankDiff !== 0) return rankDiff;
      if (a.type === "folder" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;
      return a.name.localeCompare(b.name);
    });
  }

  return convert(tree);
}

function isHiddenDoc(relativePath) {
  return path.posix.basename(relativePath).startsWith("__");
}

export function prettifyName(raw) {
  const name = raw.replace(/\.[^.]+$/, "");
  const specialNames = new Map([
    ["spring-boot", "Spring Boot"],
    ["get-started", "Get Started"],
    ["nestjs", "NestJS"],
    ["expressjs", "ExpressJS"],
    ["fastapi", "FastAPI"],
    ["asp-net", "ASP.NET"],
    ["gin", "Gin"],
  ]);

  if (specialNames.has(name)) {
    return specialNames.get(name);
  }

  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function toUrlPath(raw) {
  const name = raw.replace(/\.[^.]+$/, "");
  if (name.startsWith("__")) {
    return name;
  }

  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

export function extractTitle(content, fallback) {
  const match = content.match(/---\s*title:\s*(.+?)\s*---/);
  return match ? match[1].trim() : prettifyName(fallback);
}
