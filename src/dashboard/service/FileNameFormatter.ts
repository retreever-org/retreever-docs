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