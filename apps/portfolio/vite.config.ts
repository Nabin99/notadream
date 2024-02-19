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
      stylexPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            title: process.env.VITE_APP_TITLE || "Portfolio",
            description:
              process.env.VITE_APP_DESCRIPTION ||
              "Portfolio of Mr. Nabin Dhital",
            keywords:
              process.env.VITE_APP_KEYWORDS ||
              "Software developer, React, NodeJs, MERN stack",
            author: process.env.VITE_APP_AUTHOR || "Nabin Dhital",
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
      port: Number(process.env.VITE_APP_PORT) || 4003,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
