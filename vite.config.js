import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['styled-components', 'framer-motion'],
          'form-vendor': ['react-hook-form', 'emailjs-com', 'validator'],
          icons: ['react-icons'],
          'state-vendor': ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
        drop_debugger: true,
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false // Remove comments from production build
      }
    },
    sourcemap: false, // Disable sourcemaps in production for smaller files
    target: 'es2020' // Modern browsers only for smaller bundle
  },
  server: {
    open: false,
    cors: true
  },
  preview: {
    port: 3000
  },
  // Optimize development
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components', 'framer-motion']
  }
})
