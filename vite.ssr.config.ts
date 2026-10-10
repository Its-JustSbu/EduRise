import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Separate from the main config on purpose: the SSR bundle is a throwaway
// used only by scripts/prerender.mjs, so it skips the Cloudflare and devtools
// plugins, which exist to shape the deployable client build.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    ssr: 'src/entry-server.ts',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    copyPublicDir: false,
  },
})
