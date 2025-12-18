import fs from "node:fs";
import path from "node:path";
import { resolveDocsBuild } from "./build-resolver.js";

async function main() {
  const tree = await resolveDocsBuild();

  const publicDir = path.resolve(process.cwd(), "public");
  const publicPath = path.join(publicDir, "doc-tree.json");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(publicPath, JSON.stringify(tree, null, 2), "utf-8");
  console.log("doc-tree.json written to", publicPath);
}

main().catch((err) => {
  console.error("Failed to generate doc-tree.json", err);
  process.exit(1);
});
