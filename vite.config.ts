/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared/ui': path.resolve(__dirname, 'src/shared/components/ui'),
      '@shared/lib': path.resolve(__dirname, 'src/shared/lib'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  plugins: [tailwindcss(), preact()],
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
})
