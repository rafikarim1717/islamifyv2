import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
// import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Islamify App",
        theme_color: "#8a8a8a",
        icons: [
          {
            src: "assets/images/2.png",
            sizes: "192x192",
            type: "images/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{vue,js,css,html,png,jpg,}"],
      },
    }),
    // visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
