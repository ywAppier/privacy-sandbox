import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig({
  envDir: "..",
  build: {
    rollupOptions: {
      input: {
        shoppingAd: resolve(__dirname, 'shopping-ad.html'),
        shopping: resolve(__dirname, 'shopping.html'),
        travel: resolve(__dirname, 'travel.html'),
        travelAd: resolve(__dirname, 'travel-ad.html'),
      },
    },
  },
});
