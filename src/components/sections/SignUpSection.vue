<script setup lang="ts">
import { motion } from 'motion-v'
import SignUpForm from '@/components/ui/SignUpForm.vue'
import DecorativeBlob from '@/components/ui/DecorativeBlob.vue'
</script>

<template>
  <section id="signup" class="signup section">
    <DecorativeBlob variant="gold" class="signup__blob" :opacity="0.1" />

    <div class="container signup__inner">
      <motion.div
        class="signup__intro"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.4 }"
        :transition="{ duration: 0.5 }"
      >
        <span class="eyebrow">Sign Up</span>
        <h2>Start your learner's development journey</h2>
        <p class="signup__lede">
          Tell us a little about your learner and we'll be in touch to discuss the right modules
          for their needs and goals.
        </p>
      </motion.div>

      <motion.div
        class="signup__card"
        :initial="{ opacity: 0, y: 32 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <SignUpForm />
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.signup {
  position: relative;
  background: var(--color-cream-100);
  overflow: hidden;
}

.signup__blob {
  width: 28rem;
  height: 28rem;
  top: -6rem;
  right: -8rem;
}

.signup__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-8);
  align-items: start;
}

.signup__lede {
  color: var(--color-navy-700);
  margin-top: var(--space-4);
  line-height: 1.6;
}

.signup__card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-7);
  box-shadow: var(--shadow-md);
}

@media (max-width: 860px) {
  .signup__inner {
    grid-template-columns: 1fr;
  }

  .signup__card {
    padding: var(--space-5);
  }
}
</style>
