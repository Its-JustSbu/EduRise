<script setup lang="ts">
import { motion } from 'motion-v'
import { modules } from '@/data/siteContent'
import ModuleCard from '@/components/ui/ModuleCard.vue'
</script>

<template>
  <section id="services" class="services section">
    <div class="container">
      <motion.div
        class="services__intro"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow">Our Development Modules</span>
        <h2>Personalised support across four development areas</h2>
        <p class="services__lede">
          Learners can access individual modules or combine different modules according to their
          development needs — three structured sessions each week, shaped around their strengths,
          goals and areas for growth.
        </p>
      </motion.div>

      <div class="services__grid">
        <ModuleCard v-for="(module, index) in modules" :key="module.id" :module="module" :index="index" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--color-cream-100);
}

.services__intro {
  max-width: 40rem;
  margin-bottom: var(--space-8);
}

.services__lede {
  color: var(--color-navy-700);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-top: var(--space-4);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

@media (max-width: 780px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
