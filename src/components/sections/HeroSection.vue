<script setup lang="ts">
import { motion } from 'motion-v'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { orgInfo } from '@/data/siteContent'
import DecorativeBlob from '@/components/ui/DecorativeBlob.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { scrollToSection } = useSmoothScroll()

const riseIn = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } }
function delayed(seconds: number) {
  return { duration: 0.55, delay: seconds, ease: [0.16, 1, 0.3, 1] }
}
</script>

<template>
  <section id="hero" class="hero">
    <DecorativeBlob variant="gold" class="hero__blob hero__blob--top" :opacity="0.18" />
    <DecorativeBlob variant="blush" class="hero__blob hero__blob--bottom" :opacity="0.12" />

    <div class="hero__content container">
      <motion.span
        class="eyebrow hero__eyebrow"
        :initial="riseIn.initial"
        :animate="riseIn.animate"
        :transition="delayed(0.05)"
      >
        Inspiring Future Leaders Today
      </motion.span>
      <motion.h1
        class="hero__heading"
        :initial="riseIn.initial"
        :animate="riseIn.animate"
        :transition="delayed(0.17)"
      >
        {{ orgInfo.outcomeStatement }}
      </motion.h1>
      <motion.p
        class="hero__tagline"
        :initial="riseIn.initial"
        :animate="riseIn.animate"
        :transition="delayed(0.29)"
      >
        {{ orgInfo.tagline }}
      </motion.p>
      <motion.div
        class="hero__actions"
        :initial="riseIn.initial"
        :animate="riseIn.animate"
        :transition="delayed(0.41)"
      >
        <BaseButton variant="primary" @click="scrollToSection('signup')">Enquire Now</BaseButton>
        <BaseButton variant="secondary" @click="scrollToSection('services')">
          Explore Our Modules
        </BaseButton>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--color-navy-900);
  overflow: hidden;
  padding-top: var(--nav-height);
}

.hero__blob {
  width: 32rem;
  height: 32rem;
}

.hero__blob--top {
  top: -8rem;
  right: -8rem;
}

.hero__blob--bottom {
  bottom: -10rem;
  left: -10rem;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 46rem;
}

.hero__eyebrow {
  color: var(--color-gold-300);
}

.hero__heading {
  color: var(--color-white);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  margin-bottom: var(--space-4);
}

.hero__tagline {
  color: rgba(248, 243, 233, 0.85);
  font-size: 1.25rem;
  font-style: italic;
  font-family: var(--font-display);
  margin-bottom: var(--space-6);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}
</style>
