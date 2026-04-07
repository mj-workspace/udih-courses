import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cybersecurity-presentation': 'http://localhost:5175',
      '/cybersecurity-lecturer-guide': 'http://localhost:5174',
    },
  },
})
