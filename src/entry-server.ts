import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { routes } from './router/routes'

// Renders the app to HTML at build time. The browser entry hydrates this
// markup rather than mounting over an empty div.
export async function render(url: string) {
  const app = createSSRApp(App)
  const router = createRouter({ history: createMemoryHistory(), routes })

  app.use(router)
  await router.push(url)
  await router.isReady()

  return renderToString(app)
}
