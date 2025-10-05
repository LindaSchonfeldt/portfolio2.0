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
    chunkSizeWarningLimit: 500, // Lowered from 1000 to be more strict
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    }
  },
  // Optimize development
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components', 'framer-motion']
  }
})
