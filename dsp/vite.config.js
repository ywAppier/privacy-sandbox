import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig({
  envDir: "..",
  build: {
    rollupOptions: {
      input: {
        joinAdInterestGroup: resolve(__dirname, 'join-ad-interest-group.html'),
      },
    },
  },
});
