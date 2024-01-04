import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { devDependencies, dependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      name: "NotadreamBackend",
      fileName: "notadream-backend",
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies), ...Object.keys(dependencies)],
      output: {
        exports: "named",
        globals: {},
      },
    },
    target: "es2022",
  },
  resolve: {
    alias: {
      "@/": new URL("src/", import.meta.url).pathname,
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
