import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], 
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        // Kontrollera att detta är din backend-port
        target: 'http://localhost:8080', 
        changeOrigin: true,
        // Avkommentera nedan om backenden inte har /api i sina routes
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
