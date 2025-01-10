import react from '@vitejs/plugin-react'
import { env } from 'node:process';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

console.log("BACKEND_URL", process.env.BACKEND_URL);

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
})
