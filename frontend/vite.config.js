import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import tailwindcss from "tailwindcss";

export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5173/',
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      tailwindcss(),
      eslint(),
      svgr({ svgrOptions: { icon: true } }),
    ],
  };
});
