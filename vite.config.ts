import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { cloudflare } from "@cloudflare/vite-plugin";

import {
  chessClub,
  chessLessonPackages,
  directors,
  educationalSupportModules,
  orgInfo,
} from './src/data/siteContent'

const SITE_ORIGIN = 'https://tlhokomelabokamosoacademy.co.za'
const CONTACT_EMAIL = 'info@tlhokomelabokamosoacademy.co.za'

// Structured data for the organisation, injected into index.html at build
// time. It is built from src/data/siteContent.ts rather than hand-written so
// the prices and services search engines see can never drift away from the
// ones on the page — a mismatch is treated as untrustworthy markup.
//
// This matters more than usual here: the app is client-rendered, so the HTML a
// crawler receives has no body text at all. Until the page is prerendered,
// this block is effectively the only substantive content in the response.
function buildStructuredData() {
  // Prices are plain rands in the content file ("R480"); Schema.org wants a
  // bare number alongside an explicit currency.
  const toAmount = (price: string) => price.replace(/[^0-9.]/g, '')

  const paidLessons = chessLessonPackages.map((pkg) => ({
    '@type': 'Offer',
    name: `${pkg.name} (${pkg.lessons})`,
    price: toAmount(pkg.price),
    priceCurrency: 'ZAR',
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      name: `Chess lessons for adults — ${pkg.name}`,
      description: pkg.highlights.join('. '),
    },
  }))

  const freeChessClub = {
    '@type': 'Offer',
    name: chessClub.title,
    price: '0',
    priceCurrency: 'ZAR',
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      name: chessClub.title,
      description: chessClub.summary,
    },
  }

  // The support modules are priced per learner after an assessment, so they
  // are listed as services without an Offer rather than with an invented price.
  const supportServices = educationalSupportModules.map((module) => ({
    '@type': 'Service',
    name: module.title,
    description: module.summary,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: orgInfo.name,
    url: `${SITE_ORIGIN}/`,
    slogan: orgInfo.tagline,
    description: orgInfo.outcomeStatement,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ikageng, Potchefstroom',
      addressRegion: 'North West',
      addressCountry: 'ZA',
    },
    areaServed: { '@type': 'City', name: 'Potchefstroom' },
    contactPoint: directors.map((director) => ({
      '@type': 'ContactPoint',
      contactType: 'Program director',
      name: director.name,
      telephone: director.phone,
      email: director.email,
    })),
    makesOffer: [...paidLessons, freeChessClub],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Educational Support',
      itemListElement: supportServices,
    },
  }
}

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
    name: 'tlhokomela-bokamoso-seo-files',
    apply: 'build',

    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(buildStructuredData(), null, 2),
          injectTo: 'head',
        },
      ]
    },

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
