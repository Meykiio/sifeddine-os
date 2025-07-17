import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { inject } from "@vercel/analytics";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'inject-vercel-analytics',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>\n            <script>${inject()}</script>`
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
