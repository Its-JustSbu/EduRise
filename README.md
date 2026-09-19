# EduRise Academy

Marketing site and learner sign-up form for EduRise Academy — Chess Coaching,
Cognitive Development, Schoolwork Support and Life Coaching & Mentorship in
Potchefstroom, South Africa.

Built with Vue 3 + Vite, animated with [motion-v](https://motion-vue.dev), and
deployed on Cloudflare Pages. See `.claude/plans` (or the conversation that
produced this repo) for the full design/deployment plan.

## Project Setup

```sh
npm install
```

Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY` to a free
[Web3Forms](https://web3forms.com) access key configured to deliver to both
program directors' inboxes.

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
