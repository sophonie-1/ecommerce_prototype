import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/ecommerce_prototype/', // ← Exact repo name + trailing slash
});