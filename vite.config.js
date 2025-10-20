import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep all React packages together in ONE chunk
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-router',
            'react-hook-form',
            'zustand'
          ],
          styled: ['styled-components'],
          motion: ['framer-motion'],
          icons: ['react-icons'],
          email: ['@emailjs/browser', 'validator']
        }
      }
    }
  }
})
