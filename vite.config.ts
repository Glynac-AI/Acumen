import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Add proper MIME type headers for TypeScript files
      'Content-Type': 'text/javascript'
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Add file extensions to be properly resolved
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
// In vite.config.ts
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: false,
  minify: 'terser',
  cssCodeSplit: true,
  // Ensure TypeScript files are compiled to JS
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, 'index.html'),
    },
    output: {
      format: 'es',
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash].[ext]'
    }
  }
}
}));
