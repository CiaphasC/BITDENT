import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { quoinReact } from '@quoin/react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [quoinReact({ editorOrigins: ['https://quoin-mini-o.vercel.app'] }), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
