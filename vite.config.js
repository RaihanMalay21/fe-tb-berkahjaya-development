import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/ 
export default defineConfig({
    server: {
        proxy: {
            '/berkahjaya': 'https://server-customer-tb-berkah-jaya-750892348569.us-central1.run.app'
        }
    },
    plugins: [react()]
})