import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ⚠️ هذا هو السر!
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    // أضف hash للملفات لمنع cache
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
});
