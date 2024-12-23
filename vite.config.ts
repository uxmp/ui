import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
