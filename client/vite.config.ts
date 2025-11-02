import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@shared', replacement: path.resolve(__dirname, '../shared') },
      { find: '@assets', replacement: path.resolve(__dirname, '../attached_assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') }
    ]
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // This ensures external modules are properly handled
      external: [
        'react',
        'react-dom',
        'react-query',
        'wouter',
        'framer-motion'
      ]
    }
  }
});