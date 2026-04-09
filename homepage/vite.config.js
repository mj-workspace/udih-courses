import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cybersecurity/presentation': 'http://localhost:5175',
      '/cybersecurity/entry-exam': {
        target: 'http://localhost:5174',
        rewrite: () => '/cybersecurity/lecturer-guide/entry-exam.html',
      },
      '/cybersecurity/program': {
        target: 'http://localhost:5174',
        rewrite: () => '/cybersecurity/lecturer-guide/program.html',
      },
      '/cybersecurity/lecturer-guide': 'http://localhost:5174',
    },
  },
})
