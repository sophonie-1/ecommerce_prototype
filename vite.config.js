import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/MARZ_Ecommerce/', // Change to your repo name! (e.g., /your-repo-name/)
})