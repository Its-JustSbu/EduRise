<script setup lang="ts">
import { motion } from 'motion-v'
import { chessLessonPackages, chessLessonsInfo } from '@/data/siteContent'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import DecorativeBlob from '@/components/ui/DecorativeBlob.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="chess-lessons" class="chess-lessons section">
    <DecorativeBlob
      variant="gold"
      class="chess-lessons__blob chess-lessons__blob--left"
      :opacity="0.12"
    />
    <DecorativeBlob
      variant="blush"
      class="chess-lessons__blob chess-lessons__blob--right"
      :opacity="0.1"
    />

    <div class="container chess-lessons__inner">
      <motion.div
        class="chess-lessons__intro"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow">{{ chessLessonsInfo.eyebrow }}</span>
        <h2 class="chess-lessons__title">{{ chessLessonsInfo.title }}</h2>
        <p class="chess-lessons__tagline">{{ chessLessonsInfo.tagline }}</p>
        <p class="chess-lessons__note">{{ chessLessonsInfo.note }}</p>
      </motion.div>

      <div class="chess-lessons__grid">
        <motion.article
          v-for="(pkg, index) in chessLessonPackages"
          :key="pkg.id"
          class="price-card"
          :class="{ 'price-card--featured': pkg.featured }"
          :initial="{ opacity: 0, y: 32 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }"
        >
          <span class="price-card__lessons">{{ pkg.lessons }}</span>

          <p class="price-card__price">{{ pkg.price }}</p>
          <p class="price-card__rate">{{ pkg.rateNote }}</p>

          <h3 class="price-card__name">{{ pkg.name }}</h3>

          <ul class="price-card__list" role="list">
            <li v-for="item in pkg.highlights" :key="item" class="price-card__item">{{ item }}</li>
          </ul>
        </motion.article>
      </div>

      <motion.div
        class="chess-lessons__cta"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :viewport="{ once: true, amount: 0.6 }"
        :transition="{ duration: 0.5 }"
      >
        <BaseButton variant="primary" @click="scrollToSection('signup')">
          Book Chess Lessons
        </BaseButton>
        <p class="chess-lessons__fineprint">
          Lessons run one hour each and are scheduled around your availability.
        </p>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.chess-lessons {
  position: relative;
  overflow: hidden;
  background: var(--color-navy-900);
}

.chess-lessons__blob {
  width: 30rem;
  height: 30rem;
}

.chess-lessons__blob--left {
  top: -8rem;
  left: -10rem;
}

.chess-lessons__blob--right {
  bottom: -10rem;
  right: -8rem;
}

.chess-lessons__inner {
  position: relative;
  z-index: 1;
}

.chess-lessons__intro {
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
  margin-bottom: var(--space-8);
}

.chess-lessons__title {
  color: var(--color-white);
}

.chess-lessons__tagline {
  display: inline-block;
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-5);
  border: 1.5px solid rgba(221, 186, 118, 0.5);
  border-radius: var(--radius-full);
  color: var(--color-gold-300);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.chess-lessons__note {
  color: rgba(248, 243, 233, 0.75);
  line-height: 1.6;
  margin-top: var(--space-4);
}

.chess-lessons__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: var(--space-6);
}

.price-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-cream-50);
  box-shadow: var(--shadow-md);
  border: 1.5px solid rgba(192, 151, 63, 0.35);
}

.price-card--featured {
  padding-block: var(--space-7);
  border-color: var(--color-gold-500);
  box-shadow: var(--shadow-gold);
}

.price-card__lessons {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  background: var(--color-navy-900);
  color: var(--color-cream-100);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.price-card--featured .price-card__lessons {
  background: var(--color-gold-500);
  color: var(--color-navy-900);
}

.price-card__price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 3.25rem);
  line-height: 1;
  color: var(--color-gold-500);
  margin-top: var(--space-5);
}

.price-card__rate {
  color: var(--color-navy-700);
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: var(--space-2);
}

.price-card__name {
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: var(--space-4);
}

.price-card__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.price-card__item {
  color: var(--color-navy-700);
  font-size: 0.9rem;
  line-height: 1.4;
}

.chess-lessons__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-8);
  text-align: center;
}

.chess-lessons__fineprint {
  color: rgba(248, 243, 233, 0.6);
  font-size: 0.875rem;
}

@media (max-width: 960px) {
  .chess-lessons__grid {
    grid-template-columns: 1fr;
    max-width: 26rem;
    margin-inline: auto;
  }

  .price-card--featured {
    padding-block: var(--space-6);
  }
}
</style>
