import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      '/profile': 'http://localhost:5432',
    },
    plugins: [
        react(),
        eslint(),
        svgr({ svgrOptions: { icon: true } }),
      ],
  };
});