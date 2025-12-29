import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Use relative paths so the built site works when uploaded to
      // static hosts that serve the site from arbitrary folders.
      base: './',
      // Output build into `dist` for standard static hosts (Vercel).
      // `emptyOutDir` ensures previous files are removed.
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        // Split vendor and framework code to improve caching and load on low-end devices
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react')) return 'vendor_react';
                if (id.includes('framer-motion')) return 'vendor_framer';
                return 'vendor';
              }
            }
          }
        },
        // Raise chunk warning to avoid noisy logs during dev; adjust if you want stricter checks
        chunkSizeWarningLimit: 1000,
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: [
        'reflexly-subdilated-leatha.ngrok-free.dev'
      ]
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
