// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue')
  },
  {
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
  // useAuthStore() kan bara anropas EFTER att Pinia är installerat,
  // vilket det är när routern körs (se main.ts).
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/'
  }
})
