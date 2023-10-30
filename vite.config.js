/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
      ssr: 'resources/js/ssr.jsx',
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'resources/js') }],
  },
  server: {
    host: true
  },
  define: {
    // global: {},
    _global: ({})
  },
  ssr: {
    noExternal: ['usehooks-ts', 'react-icons']
  },
  // remove console log when build
  esbuild: {
    minify: true,
    drop: ['console', 'debugger']
  },
});
