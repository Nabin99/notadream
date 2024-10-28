// vite.config.ts
import { fileURLToPath, URL } from "url";
import react from "file:///home/nabin/projects/notadream/node_modules/.pnpm/@vitejs+plugin-react@4.3.0_vite@4.5.3_@types+node@22.5.4_terser@5.31.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///home/nabin/projects/notadream/node_modules/.pnpm/vite@4.5.3_@types+node@22.5.4_terser@5.31.0/node_modules/vite/dist/node/index.js";
import viteCompression from "file:///home/nabin/projects/notadream/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.5.3_@types+node@22.5.4_terser@5.31.0_/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///home/nabin/projects/notadream/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@4.5.3_@types+node@22.5.4_terser@5.31.0_/node_modules/vite-plugin-html/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/nabin/projects/notadream/apps/admin/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: process.env.VITE_APP_TITLE || "My app"
          }
        },
        minify: true
      }),
      viteCompression({
        compressionOptions: {
          level: 9
        }
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      port: Number(process.env.VITE_PORT) || 4001
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9uYWJpbi9wcm9qZWN0cy9ub3RhZHJlYW0vYXBwcy9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbmFiaW4vcHJvamVjdHMvbm90YWRyZWFtL2FwcHMvYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbmFiaW4vcHJvamVjdHMvbm90YWRyZWFtL2FwcHMvYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwidXJsXCI7XG5cbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZTogcHJvY2Vzcy5lbnYuVklURV9BUFBfVElUTEUgfHwgXCJNeSBhcHBcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtaW5pZnk6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICAgIGNvbXByZXNzaW9uT3B0aW9uczoge1xuICAgICAgICAgIGxldmVsOiA5LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuVklURV9QT1JUKSB8fCA0MDAxLFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXCJyZWFjdC9qc3gtcnVudGltZVwiXSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsZUFBZSxXQUFXO0FBRWhWLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLHFCQUFxQjtBQUM1QixTQUFTLHdCQUF3QjtBQUx5SixJQUFNLDJDQUEyQztBQVEzTyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBRWhFLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBLFlBQ0osT0FBTyxRQUFRLElBQUksa0JBQWtCO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBQUEsUUFDQSxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsTUFDRCxnQkFBZ0I7QUFBQSxRQUNkLG9CQUFvQjtBQUFBLFVBQ2xCLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU0sT0FBTyxRQUFRLElBQUksU0FBUyxLQUFLO0FBQUEsSUFDekM7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
