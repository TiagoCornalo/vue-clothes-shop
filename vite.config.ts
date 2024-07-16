import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "src/styles/_mixins.scss";
        @import "src/styles/_variables.scss";
        `
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
