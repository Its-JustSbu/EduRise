import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'
import { createSSRApp, createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import { routes } from '../router/routes'

// The site is prerendered (scripts/prerender.mjs) and the browser hydrates
// that markup. A hydration mismatch is silent in production — Vue patches the
// DOM and only warns — so without a test it would go unnoticed until the page
// visibly broke. This renders the real app server-side, hydrates the result,
// and fails on any mismatch warning.

class MockIntersectionObserver {
  observe = vi.fn<() => void>()
  unobserve = vi.fn<() => void>()
  disconnect = vi.fn<() => void>()
}

beforeAll(() => {
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
  window.matchMedia =
    window.matchMedia ||
    (vi.fn<(query: string) => MediaQueryList>().mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener: vi.fn<() => void>(),
          removeEventListener: vi.fn<() => void>(),
        }) as unknown as MediaQueryList,
    ) as unknown as typeof window.matchMedia)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function buildApp(ssr: boolean) {
  const app = ssr ? createSSRApp(App) : createApp(App)
  app.use(createRouter({ history: createMemoryHistory(), routes }))
  return app
}

async function renderServerHtml() {
  const app = buildApp(true)
  await app.config.globalProperties.$router.push('/')
  await app.config.globalProperties.$router.isReady()
  return renderToString(app)
}

describe('prerendering', () => {
  it('renders the page content to HTML on the server', async () => {
    const html = await renderServerHtml()
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

    // The whole point: a crawler must see real content, not an empty shell.
    expect(text).toContain('Tlhokomela Bokamoso Academy')
    expect(text).toContain('Skill Master Package')
    expect(text).toContain('R880')
    expect(html).toMatch(/<h1/)
  })

  it('hydrates the prerendered markup without a mismatch', async () => {
    const html = await renderServerHtml()

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)

    const app = buildApp(true)
    await app.config.globalProperties.$router.push('/')
    await app.config.globalProperties.$router.isReady()
    app.mount(container)

    const messages = [...warn.mock.calls, ...error.mock.calls]
      .map((args) => args.map(String).join(' '))
      .filter((message) => /hydration/i.test(message))

    expect(messages).toEqual([])

    app.unmount()
    container.remove()
  })
})
