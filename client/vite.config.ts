import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      shared: path.resolve(__dirname, '../shared/src'),
    },
  },
  // Ensure TypeScript files are handled properly
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
