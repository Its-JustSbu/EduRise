import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Kept apart from index.ts so the prerender entry can import the route table
// without pulling in createWebHistory, which touches window at module load.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
]
