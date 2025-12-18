
export function slugify(raw: string): string {
  const text = raw
    // remove markdown link syntax: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // remove inline code/backticks: `code` -> code
    .replace(/`([^`]+)`/g, "$1")
    .trim();

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word except space and hyphen
    .replace(/\s+/g, "-");    // spaces -> hyphen
}