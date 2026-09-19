<script setup lang="ts">
import { motion } from 'motion-v'

const points = [
  { title: 'Chess', description: 'develops the way learners think.' },
  { title: 'Cognitive development', description: 'strengthens the way learners process information.' },
  { title: 'Schoolwork support', description: 'strengthens the way learners learn.' },
  { title: 'Life coaching', description: 'develops the way learners conduct themselves.' },
]
</script>

<template>
  <section id="difference" class="difference section">
    <div class="container difference__inner">
      <motion.div
        class="difference__copy"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow">The EduRise Difference</span>
        <h2>Education is about more than marks</h2>
        <p class="difference__lede">
          Together, these areas create a supportive environment where learners can grow
          academically, intellectually, personally and socially.
        </p>
      </motion.div>

      <motion.ul
        class="difference__points"
        role="list"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.5, delay: 0.15 }"
      >
        <li v-for="point in points" :key="point.title">
          <strong>{{ point.title }}</strong> {{ point.description }}
        </li>
      </motion.ul>
    </div>
  </section>
</template>

<style scoped>
.difference {
  background: var(--color-cream-100);
}

.difference__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: start;
}

.difference__lede {
  color: var(--color-navy-700);
  margin-top: var(--space-4);
  line-height: 1.6;
  font-size: 1.05rem;
}

.difference__points {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: var(--color-cream-50);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.difference__points li {
  line-height: 1.6;
  border-bottom: 1px solid rgba(14, 27, 51, 0.08);
  padding-bottom: var(--space-4);
}

.difference__points li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.difference__points strong {
  color: var(--color-navy-900);
  font-family: var(--font-display);
}

@media (max-width: 860px) {
  .difference__inner {
    grid-template-columns: 1fr;
  }
}
</style>
