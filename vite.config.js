import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'ltc-rates.com',
      'www.ltc-rates.com',
    ],
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
