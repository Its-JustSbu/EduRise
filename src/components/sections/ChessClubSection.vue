<script setup lang="ts">
import { motion } from 'motion-v'
import { chessClub } from '@/data/siteContent'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import DecorativeBlob from '@/components/ui/DecorativeBlob.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="chess-club" class="chess-club section">
    <div class="container">
      <motion.div
        class="chess-club__card"
        :initial="{ opacity: 0, y: 32 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.5 }"
      >
        <DecorativeBlob variant="gold" class="chess-club__blob" :opacity="0.15" />

        <div class="chess-club__content">
          <div class="chess-club__heading-row">
            <span class="eyebrow chess-club__eyebrow">Free Community Initiative</span>
            <span class="chess-club__badge">Free</span>
          </div>
          <h2 class="chess-club__title">{{ chessClub.title }}</h2>
          <p class="chess-club__summary">{{ chessClub.summary }}</p>
          <p class="chess-club__note">
            Open to kids in our community at no cost — our way of giving back and introducing
            learners to the thinking skills chess builds.
          </p>

          <ul class="chess-club__list" role="list">
            <li v-for="item in chessClub.develops" :key="item" class="chess-club__tag">
              {{ item }}
            </li>
          </ul>

          <BaseButton variant="primary" @click="scrollToSection('signup')">
            Join the Chess Club
          </BaseButton>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.chess-club {
  background: var(--color-cream-100);
}

.chess-club__card {
  position: relative;
  overflow: hidden;
  background: var(--color-navy-900);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

.chess-club__blob {
  width: 24rem;
  height: 24rem;
  top: 2rem;
  right: -6rem;
}

.chess-club__content {
  position: relative;
  z-index: 1;
  max-width: 40rem;
}

.chess-club__heading-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.chess-club__eyebrow {
  margin-bottom: 0;
}

.chess-club__badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--color-gold-500);
  color: var(--color-navy-900);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chess-club__title {
  color: var(--color-white);
  margin-top: var(--space-3);
}

.chess-club__summary {
  color: var(--color-cream-100);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-top: var(--space-3);
}

.chess-club__note {
  color: rgba(248, 243, 233, 0.7);
  line-height: 1.6;
  margin-top: var(--space-3);
}

.chess-club__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-5);
  margin-bottom: var(--space-6);
}

.chess-club__tag {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  background: rgba(248, 243, 233, 0.1);
  color: var(--color-cream-100);
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.2;
}

.chess-club__tag::before {
  content: '';
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-gold-500);
}

@media (max-width: 640px) {
  .chess-club__card {
    padding: var(--space-6);
  }
}
</style>
