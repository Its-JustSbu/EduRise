<script setup lang="ts">
import { motion } from 'motion-v'
import type { TimelineStep } from '@/data/siteContent'

defineProps<{
  step: TimelineStep
  index: number
  isLast: boolean
}>()
</script>

<template>
  <motion.div
    class="timeline-step"
    :initial="{ opacity: 0, x: -24 }"
    :while-in-view="{ opacity: 1, x: 0 }"
    :viewport="{ once: true, amount: 0.5 }"
    :transition="{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }"
  >
    <div class="timeline-step__marker">
      <span class="timeline-step__number">{{ index + 1 }}</span>
      <motion.span
        v-if="!isLast"
        class="timeline-step__line"
        :initial="{ scaleY: 0 }"
        :while-in-view="{ scaleY: 1 }"
        :viewport="{ once: true, amount: 0.5 }"
        :transition="{ duration: 0.5, delay: index * 0.08 + 0.2 }"
      />
    </div>
    <div class="timeline-step__body">
      <h3 class="timeline-step__title">{{ step.title }}</h3>
      <p class="timeline-step__description">{{ step.description }}</p>
    </div>
  </motion.div>
</template>

<style scoped>
.timeline-step {
  display: flex;
  gap: var(--space-5);
}

.timeline-step__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-step__number {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--color-navy-900);
  color: var(--color-gold-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
}

.timeline-step__line {
  width: 2px;
  flex: 1;
  min-height: var(--space-7);
  background: var(--color-gold-500);
  transform-origin: top;
  margin-block: var(--space-2);
}

.timeline-step__body {
  padding-block: var(--space-1) var(--space-7);
}

.timeline-step__title {
  font-size: 1.15rem;
  margin-bottom: var(--space-1);
}

.timeline-step__description {
  color: var(--color-navy-700);
  line-height: 1.6;
}
</style>
