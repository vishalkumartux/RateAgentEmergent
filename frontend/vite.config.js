import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: [
      'homerate-app.preview.emergentagent.com',
      '.emergentagent.com',
      'localhost',
      '127.0.0.1'
    ],
    hmr: {
      host: 'homerate-app.preview.emergentagent.com',
      protocol: 'wss',
      clientPort: 443
    }
  },
  build: {
    outDir: 'build',
  },
})
