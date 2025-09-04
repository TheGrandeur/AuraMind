import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  // Plugins used by Vite
  plugins: [
    react() // Enables React fast refresh and JSX support
  ],
})