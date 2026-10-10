// Injects the server-rendered markup into the built index.html.
//
// The app is a client-rendered SPA, so without this the document a crawler
// receives contains an empty <div id="app"> and no body text at all. Google
// renders JavaScript and would eventually see the content, but Bing, link
// preview bots and AI crawlers largely do not, and a deferred render is a
// weaker signal than markup that is simply there.
//
// Run after both the client build (which writes dist/index.html) and the SSR
// build (which writes dist-ssr/entry-server.js).

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const entryPath = resolve(root, 'dist-ssr/entry-server.js')
const MOUNT = '<div id="app"></div>'

// motion-v serialises its `initial` state, so prerendered elements carry
// style="opacity:0;transform:...". With JavaScript the animations clear it;
// without, the page would look blank. The trailing semicolon keeps this off
// the decorative blobs, which legitimately render at opacity:0.18 and 0.12.
const NOSCRIPT_FALLBACK = `<noscript><style>[style*="opacity:0;"]{opacity:1!important;transform:none!important}</style></noscript>`

const { render } = await import(pathToFileURL(entryPath).href)
const appHtml = await render('/')

let html = await readFile(htmlPath, 'utf8')

if (!html.includes(MOUNT)) {
  throw new Error(`prerender: could not find ${MOUNT} in dist/index.html`)
}

html = html
  .replace(MOUNT, `<div id="app">${appHtml}</div>`)
  .replace('</head>', `  ${NOSCRIPT_FALLBACK}\n  </head>`)

await writeFile(htmlPath, html, 'utf8')

const text = appHtml
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
console.log(`prerender: injected ${appHtml.length} bytes (${text.length} chars of text)`)
