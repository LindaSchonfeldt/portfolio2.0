import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'styled-vendor': ['styled-components'],
          'motion-vendor': ['framer-motion'],
          'form-vendor': ['react-hook-form'],
          'icons-vendor': ['react-icons']
        }
      }
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2 // Run compression twice for better results
      },
      format: {
        comments: false
      },
      mangle: {
        safari10: true
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  }
})
