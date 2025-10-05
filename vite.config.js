import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendors by package for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            if (id.includes('styled-components')) {
              return 'styled-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor'
            }
            if (
              id.includes('emailjs') ||
              id.includes('react-hook-form') ||
              id.includes('validator') ||
              id.includes('recaptcha')
            ) {
              return 'form-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons'
            }
            if (id.includes('zustand')) {
              return 'state-vendor'
            }
            // All other node_modules
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 300, // More aggressive warning
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production for smaller bundle
        drop_debugger: true,
        passes: 3, // More compression passes
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
        unused: true,
        dead_code: true
      },
      mangle: {
        safari10: true,
        toplevel: true // More aggressive minification
      },
      format: {
        comments: false
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
