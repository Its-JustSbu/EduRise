<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline'
    as?: 'button' | 'a'
    href?: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    as: 'button',
    href: undefined,
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <component
    :is="motion[as]"
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :while-hover="disabled ? undefined : { scale: 1.03 }"
    :while-tap="disabled ? undefined : { scale: 0.97 }"
    :transition="{ duration: 0.15, ease: 'easeOut' }"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
}

.base-button--primary {
  background: var(--color-gold-500);
  color: var(--color-navy-900);
  box-shadow: var(--shadow-gold);
}

.base-button--secondary {
  background: transparent;
  color: var(--color-white);
  border: 1.5px solid var(--color-cream-100);
}

.base-button--outline {
  background: transparent;
  color: var(--color-navy-900);
  border: 1.5px solid rgba(14, 27, 51, 0.25);
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
