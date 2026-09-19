<script setup lang="ts">
import { motion } from 'motion-v'
import { timelineSteps } from '@/data/siteContent'
import TimelineStep from '@/components/ui/TimelineStep.vue'
</script>

<template>
  <section id="approach" class="approach section">
    <div class="container approach__inner">
      <motion.div
        class="approach__intro"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow eyebrow--dark">How Our Service Works</span>
        <h2 class="approach__heading">Our Development Approach</h2>
        <p class="approach__lede">
          Every learner moves through the same considered cycle, so progress is always visible,
          reviewed and built upon.
        </p>
      </motion.div>

      <div class="approach__timeline">
        <TimelineStep
          v-for="(step, index) in timelineSteps"
          :key="step.id"
          :step="step"
          :index="index"
          :is-last="index === timelineSteps.length - 1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.approach {
  background: var(--color-navy-900);
  color: var(--color-cream-100);
}

.approach__inner {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-8);
}

.approach__heading {
  color: var(--color-white);
}

.eyebrow--dark {
  color: var(--color-gold-300);
}

.approach__lede {
  color: rgba(248, 243, 233, 0.8);
  margin-top: var(--space-4);
  line-height: 1.6;
}

.approach__timeline :deep(.timeline-step__title) {
  color: var(--color-white);
}

.approach__timeline :deep(.timeline-step__description) {
  color: rgba(248, 243, 233, 0.75);
}

@media (max-width: 860px) {
  .approach__inner {
    grid-template-columns: 1fr;
  }
}
</style>
