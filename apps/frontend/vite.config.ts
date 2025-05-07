import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx"],
  },
  server: {
    proxy: {
      '/server': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});