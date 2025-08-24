import path from "path"

import { defineConfig } from "vite"

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    commonjsOptions: {
      dynamicRequireTargets: ["better-sqlite3"],
      ignoreDynamicRequires: true,
    },
    rollupOptions: {
      external: ["better-sqlite3"],
    },
  },
})
