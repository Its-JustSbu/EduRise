# Tlhokomela Bokamoso Academy

Marketing site and learner sign-up form for Tlhokomela Bokamoso Academy — Chess
Coaching,
Cognitive Development, Schoolwork Support and Life Coaching & Mentorship in
Potchefstroom, South Africa.

Built with Vue 3 + Vite, animated with [motion-v](https://motion-vue.dev), and
deployed on Cloudflare Workers at <https://tlhokomelabokamosoacademy.co.za>. See
`.claude/plans` (or the conversation that produced this repo) for the full
design/deployment plan.

## Project Setup

```sh
npm install
```

Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY` to a free
[Web3Forms](https://web3forms.com) access key configured to deliver to
info@tlhokomelabokamosoacademy.co.za.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with ESLint + oxlint

```sh
npm run lint
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Deployment

Two Wrangler environments are declared in `wrangler.jsonc`:

| Environment | Worker | Served at |
| --- | --- | --- |
| `production` | `tlhokomela-bokamoso` | `tlhokomelabokamosoacademy.co.za` + `www` (workers.dev disabled) |
| `devtest` | `tlhokomela-bokamoso-devtest` | `tlhokomela-bokamoso-devtest.116superstm.workers.dev` |

CI deploys both: pushes to `devtest` go to staging, pushes to `main` go to
production behind a required reviewer. Manual deploys use `npm run deploy` or
`npm run deploy:devtest`.

**The environment is resolved at build time, not deploy time.** The Cloudflare
Vite plugin reads `CLOUDFLARE_ENV` and writes a flattened `dist/wrangler.json`,
so a build with no `CLOUDFLARE_ENV` produces an artifact with no routes that
would deploy to the wrong worker. Always build through the scripts above, never
a bare `vite build` followed by `wrangler deploy`.

The production deploy creates the custom domains, so `CLOUDFLARE_API_TOKEN`
needs **Zone (Read)** and **Workers Routes (Edit)** on `tlhokomelabokamosoacademy.co.za`
alongside its Workers scopes.

`robots.txt` and `sitemap.xml` are generated into the build by a small plugin
in `vite.config.ts` rather than checked into `public/`, so `lastmod` stays
accurate. The devtest build emits `Disallow: /` so the staging copy is never
indexed; every other build is crawlable.

## Prerendering

`npm run build` renders the page to static HTML before deploying, so the
document a crawler receives contains the real content rather than an empty
`<div id="app">`. Three steps, in order:

1. `build-only` — the client bundle, into `dist/`
2. `build:ssr` — a throwaway SSR bundle (`vite.ssr.config.ts`), into `dist-ssr/`
3. `prerender` — `scripts/prerender.mjs` renders `/` and injects the markup
   into `dist/index.html`

The browser then hydrates that markup, which is why `main.ts` uses
`createSSRApp` rather than `createApp`. Route definitions live in
`src/router/routes.ts`, apart from `src/router/index.ts`, so the prerender
entry can import them without pulling in `createWebHistory` — that touches
`window` at module load and would crash the SSR build.

`motion-v` serialises its `initial` state, so prerendered elements carry
`style="opacity:0"`. The animations clear it in the browser; a `<noscript>`
rule in the prerendered HTML covers visitors without JavaScript. That rule
matches `opacity:0;` with the semicolon so it leaves the decorative blobs,
which legitimately render at `opacity:0.18` and `0.12`, alone.

`src/__tests__/hydration.spec.ts` renders the real app server-side and
hydrates it, failing on any mismatch warning. A mismatch is otherwise silent
in production, so this is the guard that keeps prerendering honest.

## Email

DNS and inbound mail are on Cloudflare. `info@tlhokomelabokamosoacademy.co.za` is a
[Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)
address that forwards to the program directors' inboxes — it receives only, so
replies leave from their personal addresses. Moving to mailboxes that can send
as the domain means replacing the MX records with a mail host (Zoho, Google
Workspace) and turning Email Routing off.

## Rebrand note

The site was previously EduRise Academy on `eduriseacademy.co.za`. That name
and domain were retired over a potential conflict with a similarly named
organisation; the old domain is not redirected here, so inbound links to it do
not reach this site.
