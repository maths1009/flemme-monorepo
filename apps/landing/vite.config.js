import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: 'terser',
    outDir: '../dist',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  preview: {
    open: true,
    port: 3001,
  },
  publicDir: 'public',
  root: 'src',
  server: {
    open: true,
    port: 3001,
  },
});
