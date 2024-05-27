import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      name: "NotadreamReact",
      fileName: "notadream-react",
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies)], //...Object.keys(dependencies)
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
    target: "esnext",
  },
  resolve: {
    alias: {
      "@/": new URL("src/", import.meta.url).pathname,
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/"],
    }),
  ],
});
