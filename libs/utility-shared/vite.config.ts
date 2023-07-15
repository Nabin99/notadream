import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "utility-shared",
      fileName: "utility-shared",
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies)],
      output: {
        globals: {},
      },
    },
  },
  plugins: [dts()],
});
