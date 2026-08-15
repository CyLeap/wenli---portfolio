import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const writeupRoot = resolve(process.cwd(), "writeups");
const writeupPages = Object.fromEntries(
  readdirSync(writeupRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [`writeup-${entry.name}`, resolve(writeupRoot, entry.name, "index.html")])
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        portfolio: resolve(process.cwd(), "index.html"),
        writeups: resolve(writeupRoot, "index.html"),
        ...writeupPages
      },
      output: {
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
