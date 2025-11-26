import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',

  // Use "/" for local dev, repo name for production
  base: command === 'serve' ? '/' : '/Angwe-Chima-Site/',

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
}));
