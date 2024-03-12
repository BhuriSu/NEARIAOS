import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

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
  
      eslint(),
      svgr({ svgrOptions: { icon: true } }),
    ],
  };
});
