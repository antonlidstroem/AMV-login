// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    // App.vue monteras direkt i main.ts – ska INTE vara en route.
    // Routern hanterar bara sidor man navigerar TILL efter inloggning.
    path: '/dashboard',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return false // blockera – stanna kvar, App.vue hanterar visningen
  }
})
