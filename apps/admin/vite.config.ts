import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { stylexPlugin } from "vite-plugin-stylex-dev";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      react(),
      stylexPlugin({
        classNamePrefix: "nd-",
        useRemForFontSize: true,
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: process.env.VITE_APP_TITLE || "My app",
          },
        },
        minify: true,
      }),
      viteCompression({
        compressionOptions: {
          level: 9,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(process.env.VITE_PORT) || 4001,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
