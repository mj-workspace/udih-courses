import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/digital-fundamentals/presentation/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5177,
    strictPort: true,
  },
})
