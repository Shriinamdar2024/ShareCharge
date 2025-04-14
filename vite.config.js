import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vehicleBg from '/src/assets/animated-vehicle-bg.gif';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
