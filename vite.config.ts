import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This maps the Vercel environment variable (VITE_API_KEY) 
      // to the process.env.API_KEY expected by your geminiService.ts
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.VITE_API_KEY),
      'process.env': {} // Polyfill for other potential process.env access
    }
  };
});