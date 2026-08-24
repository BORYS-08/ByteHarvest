import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  /*
   * GitHub Pages PROJECT SITE
   *
   * Repository:
   * ByteHarvest
   *
   * Published URL:
   * https://borys-08.github.io/ByteHarvest/
   */
  base: '/ByteHarvest/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules')
          ) {
            if (
              id.includes('leaflet') ||
              id.includes('react-leaflet')
            ) {
              return 'vendor-maps';
            }

            if (
              id.includes('react-icons')
            ) {
              return 'vendor-icons';
            }

            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },

  server: {
    host: true,
  },
});