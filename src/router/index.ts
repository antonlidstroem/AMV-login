// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: { render: () => null } // En tom komponent eftersom App.vue sköter vyn
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  // Fix: redirect to '/' instead of returning false.
  // Returning false cancels navigation silently; the user gets a blank screen
  // if they arrive at a protected URL directly (e.g. bookmark, back button).
  // Redirecting to '/' ensures they always land on the login page.
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: '/' }
  }
})
