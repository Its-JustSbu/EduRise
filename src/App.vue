<script setup lang="ts">
import { RouterView } from 'vue-router'
import { MotionConfig } from 'motion-v'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <MotionConfig reduced-motion="user">
    <AppNav />
    <RouterView />
    <AppFooter />
  </MotionConfig>
</template>
