<script setup lang="ts">
import { motion } from 'motion-v'
import { educationalSupportModules } from '@/data/siteContent'
import ModuleCard from '@/components/ui/ModuleCard.vue'
</script>

<template>
  <section id="educational-support" class="educational-support section">
    <div class="container">
      <motion.div
        class="educational-support__intro"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow">Educational Support</span>
        <h2>Personalised programmes for your learner</h2>
        <p class="educational-support__lede">
          Our structured, paid programmes. Pick one, or combine a few — every learner gets 3
          sessions a week, built around their own goals.
        </p>
      </motion.div>

      <div class="educational-support__grid">
        <ModuleCard
          v-for="(module, index) in educationalSupportModules"
          :key="module.id"
          :module="module"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.educational-support {
  background: var(--color-cream-100);
}

.educational-support__intro {
  max-width: 40rem;
  margin-bottom: var(--space-8);
}

.educational-support__lede {
  color: var(--color-navy-700);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-top: var(--space-4);
}

.educational-support__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 960px) {
  .educational-support__grid {
    grid-template-columns: 1fr;
  }
}
</style>
