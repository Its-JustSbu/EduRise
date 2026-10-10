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
