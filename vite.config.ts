import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Car-Rental-Website/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
