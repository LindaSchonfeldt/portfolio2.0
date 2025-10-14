import react from '@vitejs/plugin-react'
import process from 'process'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      // Disable React DevTools in production
      babel: {
        plugins:
          process.env.NODE_ENV === 'production'
            ? [['transform-react-remove-prop-types', { removeImport: true }]]
            : []
      }
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'react-vendor'
            }
            if (id.includes('styled-components')) {
              return 'styled-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'framer-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
            if (id.includes('emailjs')) {
              return 'email-vendor'
            }
            // All other node_modules
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
