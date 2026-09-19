import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNav from '../AppNav.vue'
import { navLinks } from '@/data/siteContent'

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

describe('AppNav', () => {
  it('renders a link for every section in navLinks', () => {
    const wrapper = mount(AppNav)
    const linkLabels = wrapper.findAll('.app-nav__link').map((link) => link.text())

    navLinks.forEach((link) => {
      expect(linkLabels).toContain(link.label)
    })
  })

  it('renders the brand name and a call to action', () => {
    const wrapper = mount(AppNav)

    expect(wrapper.text()).toContain('EduRise Academy')
    expect(wrapper.text()).toContain('Enquire Now')
  })
})
