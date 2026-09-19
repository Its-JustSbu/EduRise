<script setup lang="ts">
import { motion } from 'motion-v'
import type { Module } from '@/data/siteContent'

defineProps<{
  module: Module
  index: number
}>()
</script>

<template>
  <motion.article
    class="module-card"
    :initial="{ opacity: 0, y: 32 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, amount: 0.3 }"
    :transition="{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }"
  >
    <div class="module-card__accent" />
    <h3 class="module-card__title">{{ module.title }}</h3>
    <p class="module-card__summary">{{ module.summary }}</p>
    <ul class="module-card__list" role="list">
      <li v-for="item in module.develops" :key="item">{{ item }}</li>
    </ul>
  </motion.article>
</template>

<style scoped>
.module-card {
  background: var(--color-cream-50);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.module-card__accent {
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: linear-gradient(90deg, var(--color-gold-500), var(--color-gold-300));
}

.module-card__title {
  font-size: 1.375rem;
  margin-block: var(--space-2) var(--space-3);
}

.module-card__summary {
  color: var(--color-navy-700);
  margin-bottom: var(--space-4);
  line-height: 1.6;
}

.module-card__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: 0.9rem;
  color: var(--color-ink-900);
}

.module-card__list li {
  padding-left: var(--space-4);
  position: relative;
  line-height: 1.5;
}

.module-card__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold-500);
}
</style>
