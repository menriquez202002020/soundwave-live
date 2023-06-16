import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// Function to resolve "~" to the base directory
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve('src'), // Add the alias configuration
    },
  },
  server: {
    port: 3000, 
  }
})
