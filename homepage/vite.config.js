import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/udih-courses/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/udih-courses/cybersecurity-presentation': 'http://localhost:5175',
      '/udih-courses/cybersecurity-lecturer-guide': 'http://localhost:5174',
    },
  },
})
