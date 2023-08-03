import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { devDependencies, dependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      name: "NotadreamReactShared",
      fileName: "notadream-react-shared",
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies), ...Object.keys(dependencies)],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
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
