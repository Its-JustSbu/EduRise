<script setup lang="ts">
import { directors, orgInfo } from '@/data/siteContent'
import knightEmblem from '@/assets/images/knight-emblem.svg'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <div class="app-footer__brand">
        <img :src="knightEmblem" alt="" width="40" height="40" />
        <div>
          <p class="app-footer__name">{{ orgInfo.name }}</p>
          <p class="app-footer__tagline">{{ orgInfo.outcomeStatement }}</p>
        </div>
      </div>

      <div class="app-footer__contacts">
        <div v-for="director in directors" :key="director.email" class="app-footer__contact">
          <p class="app-footer__contact-name">{{ director.name }}</p>
          <p>Program Director</p>
          <a :href="`tel:${director.phone.replace(/\s+/g, '')}`">{{ director.phone }}</a>
          <a :href="`mailto:${director.email}`">{{ director.email }}</a>
        </div>
      </div>

      <div class="app-footer__location">
        <p>{{ orgInfo.location }}</p>
      </div>
    </div>

    <div class="container app-footer__bottom">
      <p>&copy; {{ year }} {{ orgInfo.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-navy-900);
  color: var(--color-cream-100);
  padding-block: var(--space-8) var(--space-5);
}

.app-footer__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
  border-bottom: 1px solid rgba(248, 243, 233, 0.12);
}

.app-footer__brand {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.app-footer__name {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-white);
  font-size: 1.15rem;
}

.app-footer__tagline {
  color: var(--color-gold-300);
  font-size: 0.9rem;
  margin-top: var(--space-1);
}

.app-footer__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.app-footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: 0.9rem;
  color: rgba(248, 243, 233, 0.8);
}

.app-footer__contact a {
  color: rgba(248, 243, 233, 0.8);
}

.app-footer__contact a:hover {
  color: var(--color-gold-300);
}

.app-footer__contact-name {
  color: var(--color-white);
  font-weight: 600;
}

.app-footer__location {
  font-size: 0.9rem;
  color: rgba(248, 243, 233, 0.8);
}

.app-footer__bottom {
  padding-top: var(--space-5);
  font-size: 0.8rem;
  color: rgba(248, 243, 233, 0.6);
}

@media (max-width: 720px) {
  .app-footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
