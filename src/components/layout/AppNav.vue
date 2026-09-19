<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { Menu, X } from '@lucide/vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { navLinks } from '@/data/siteContent'
import knightEmblem from '@/assets/images/knight-emblem.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

const { activeId } = useScrollSpy(navLinks.map((link) => link.id))
const { scrollToSection } = useSmoothScroll()

const isScrolled = ref(false)
function handleScroll() {
  isScrolled.value = window.scrollY > 48
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

const isMobileMenuOpen = ref(false)
function selectSection(id: string) {
  isMobileMenuOpen.value = false
  scrollToSection(id)
}
</script>

<template>
  <motion.header
    class="app-nav"
    :class="{ 'app-nav--scrolled': isScrolled }"
    :initial="{ opacity: 0, y: -16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }"
  >
    <div class="app-nav__inner container">
      <button class="app-nav__brand" @click="scrollToSection('hero')">
        <img :src="knightEmblem" alt="" width="36" height="36" />
        <span>EduRise Academy</span>
      </button>

      <nav class="app-nav__links" aria-label="Primary">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="app-nav__link"
          :class="{ 'app-nav__link--active': activeId === link.id }"
          @click="scrollToSection(link.id)"
        >
          {{ link.label }}
          <motion.span
            v-if="activeId === link.id"
            class="app-nav__indicator"
            layout-id="nav-underline"
            :transition="{ type: 'spring', stiffness: 420, damping: 34 }"
          />
        </button>
      </nav>

      <BaseButton class="app-nav__cta" variant="primary" @click="scrollToSection('signup')">
        Enquire Now
      </BaseButton>

      <button
        class="app-nav__toggle"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Menu v-if="!isMobileMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </div>

    <AnimatePresence>
      <motion.nav
        v-if="isMobileMenuOpen"
        class="app-nav__mobile-panel"
        aria-label="Primary mobile"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
        :transition="{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }"
      >
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="app-nav__mobile-link"
          :class="{ 'app-nav__link--active': activeId === link.id }"
          @click="selectSection(link.id)"
        >
          {{ link.label }}
        </button>
      </motion.nav>
    </AnimatePresence>
  </motion.header>
</template>

<style scoped>
.app-nav {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  background: transparent;
  transition: background-color 0.3s var(--ease-out-soft), backdrop-filter 0.3s var(--ease-out-soft);
}

.app-nav--scrolled {
  background: rgba(14, 27, 51, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}

.app-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  height: var(--nav-height);
}

.app-nav__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-white);
  font-size: 1.05rem;
}

.app-nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.app-nav__link {
  color: rgba(248, 243, 233, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  padding-block: var(--space-2);
  position: relative;
  transition: color 0.25s var(--ease-out-soft);
}

.app-nav__link--active {
  color: var(--color-gold-300);
}

.app-nav__indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-gold-500);
  border-radius: var(--radius-full);
}

.app-nav__toggle {
  display: none;
  color: var(--color-white);
}

.app-nav__mobile-panel {
  display: none;
  flex-direction: column;
  overflow: hidden;
  background: rgba(14, 27, 51, 0.97);
  padding-inline: var(--space-5);
}

.app-nav__mobile-link {
  color: var(--color-cream-100);
  text-align: left;
  padding-block: var(--space-3);
  font-weight: 500;
  border-bottom: 1px solid rgba(248, 243, 233, 0.1);
  transition: color 0.25s var(--ease-out-soft);
}

@media (max-width: 860px) {
  .app-nav__links,
  .app-nav__cta {
    display: none;
  }

  .app-nav__toggle {
    display: flex;
  }

  .app-nav__mobile-panel {
    display: flex;
  }
}
</style>
