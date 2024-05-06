import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import tailwindcss from "tailwindcss";

export default defineConfig(() => {
  return {
    server: {
      port: 5173, 
      proxy: {
        '/api': {
          target: 'http://localhost:4000', // Change to the backend server port
          secure: false, // Set it to true when put on production
          changeOrigin: true, // Add this line for proper proxy
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
