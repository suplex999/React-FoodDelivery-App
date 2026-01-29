import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'globalThis'  // ✅ FIXES "global is not defined"
  },
  optimizeDeps: {
    include: ['socket.io-client']  // ✅ Socket.IO optimization
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // ✅ Backend port 5000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // ✅ Socket.IO WebSocket proxy
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true  // ✅ WebSocket proxy
      }
    }
  }
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//   tailwindcss()],
//    server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')  // /api/products → /products
//       }
//     }
//   }
// })