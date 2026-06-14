import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static", // ← mudar de "server" para "static"
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
