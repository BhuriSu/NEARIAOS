import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import reactSwc from '@vitejs/plugin-react-swc';

export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      reactSwc(),
      eslint(),
      svgr({ svgrOptions: { icon: true } }),
    ],
  };
});
