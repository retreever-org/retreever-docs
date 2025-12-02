import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    fs: {
      allow: [
        ".",                                   // project root
        path.resolve(__dirname, "docs"),       // allow access to /docs
      ]
    }
  }
});
