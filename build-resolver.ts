import fs from 'node:fs';
import path from 'node:path';
import glob from 'fast-glob';
import type { DocNode } from './src/dashboard/types/docfile.types';

export async function resolveDocsBuild(): Promise<DocNode[]> {
  const docsDir = path.resolve(process.cwd(), 'public/markdown');
  
  // Get all .md files
  const markdownFiles = await glob('**/*.md', {
    cwd: docsDir,
    absolute: false,
  });

  if (markdownFiles.length === 0) {
    console.warn('⚠️ No Markdown files found in public/markdown/');
    return [];
  }

  const tree: Record<string, any> = {};
  const allFolders = new Set<string>();

  // Build folder structure (same as your original)
  for (const relative of markdownFiles) {
    const parts = relative.split('/');
    
    let folderPath = '';
    for (let i = 0; i < parts.length - 1; i++) {
      folderPath += (i === 0 ? '' : '/') + parts[i];
      allFolders.add(folderPath);
    }
  }

  // Create empty folders first
  for (const folderPath of allFolders) {
    const parts = folderPath.split('/');
    let current = tree;
    
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {
          type: 'folder',
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
    const content = fs.readFileSync(filePath, 'utf-8');
    const parts = relative.split('/');
    const base = parts[parts.length - 1].replace('.md', '');

    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]].children;
    }

    const title = extractTitle(content, base);
    current[base] = {
      type: 'file',
      name: prettifyName(base),
      title
    };
  }

  // Convert to DocNode[] (your existing convert logic)
  function convert(obj: Record<string, any>, prefix = ''): DocNode[] {
    const result: DocNode[] = [];
    for (const key in obj) {
      const item = obj[key];
      if (item.type === 'file') {
        result.push({
          ...item,
          path: `${prefix}${toUrlPath(key)}`,
        });
      } else {
        result.push({
          type: 'folder',
          name: item.name,
          children: convert(item.children, `${prefix}${toUrlPath(key)}/`),
        });
      }
    }
    return result.sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }

  return convert(tree);
}

export function prettifyName(raw: string): string {
  const name = raw.replace(/\.[^.]+$/, "");
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function toUrlPath(raw: string): string {
  return raw
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

export function extractTitle(content: string, fallback: string): string {
  const match = content.match(/---\s*title:\s*(.+?)\s*---/);
  return match ? match[1].trim() : prettifyName(fallback);
}