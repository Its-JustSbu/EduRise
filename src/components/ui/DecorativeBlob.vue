<script setup lang="ts">
import { computed } from 'vue'
import blobGold from '@/assets/images/blob-gold.svg'
import blobBlush from '@/assets/images/blob-blush.svg'
import blobNavy from '@/assets/images/blob-navy.svg'

const props = withDefaults(
  defineProps<{
    variant?: 'gold' | 'blush' | 'navy'
    opacity?: number
  }>(),
  {
    variant: 'gold',
    opacity: 0.35,
  },
)

const sources = { gold: blobGold, blush: blobBlush, navy: blobNavy }
const src = computed(() => sources[props.variant])
</script>

<template>
  <img :src="src" aria-hidden="true" class="decorative-blob" :style="{ opacity }" />
</template>

<style scoped>
.decorative-blob {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
</style>
