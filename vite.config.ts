import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { cloudflare } from "@cloudflare/vite-plugin";

const SITE_ORIGIN = 'https://eduriseacademy.co.za'

// Emits robots.txt and sitemap.xml into the build.
//
// The site is a single route, so the sitemap holds one entry — the section
// anchors (#chess-lessons and friends) are fragments, not separate URLs, and
// search engines ignore them in a sitemap. lastmod is stamped at build time so
// it cannot drift the way a checked-in date would.
//
// Staging is told not to index itself, so the workers.dev copy never competes
// with the real domain. The check is for devtest specifically, not "is this
// production": a build with CLOUDFLARE_ENV unset must still produce a
// crawlable robots.txt, because getting that backwards would quietly
// de-index the live site.
function seoFiles(): Plugin {
  return {
    name: 'edurise-seo-files',
    apply: 'build',
    generateBundle() {
      const isStaging = process.env.CLOUDFLARE_ENV === 'devtest'

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: isStaging
          ? 'User-agent: *\nDisallow: /\n'
          : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${SITE_ORIGIN}/</loc>`,
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), cloudflare(), seoFiles()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
