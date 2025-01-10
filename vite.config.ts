import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();

console.log("BACKEND_URL", process.env.BACKEND_URL);

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true
  },
  build: {
    sourcemap: false,
  },
});
