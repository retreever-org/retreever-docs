// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { resolveDocsBuild } from "./build-resolver";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "generate-doc-tree",
        apply: () => true, // run in both dev and build
        async buildStart() {
          if (!isDev) return; // only for dev
          const tree = await resolveDocsBuild();
          const outDir = path.resolve(process.cwd(), "public");
          const treePath = path.join(outDir, "doc-tree.json");
          if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
          fs.writeFileSync(treePath, JSON.stringify(tree, null, 2), "utf-8");
        },
        async writeBundle() {
          if (isDev) return; // only for build
          const tree = await resolveDocsBuild();
          const outDir = path.resolve(process.cwd(), "dist");
          const treePath = path.join(outDir, "doc-tree.json");
          if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
          fs.writeFileSync(treePath, JSON.stringify(tree, null, 2), "utf-8");
        },
      },
    ],
  };
});
