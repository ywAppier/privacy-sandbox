import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig({
  envDir: "..",
  build: {
    rollupOptions: {
      input: {
        adTag: resolve(__dirname, 'ad-tag.html'),
      },
    },
  },
});
