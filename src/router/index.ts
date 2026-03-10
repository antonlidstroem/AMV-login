import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthService } from '../services/apiClient';


// 1. Vi definierar vilka fält som ska finnas i 'meta' för att få autocompletion
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

// 2. Vi använder typen RouteRecordRaw[] för vår array
const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: () => import('../App.vue') 
  },
  { 
    path: '/LoginView',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 3. 'to' och 'from' typas automatiskt av Vue Router här
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('mockLogin')

  // Tack vare 'declare module' ovan vet TS nu att requiresAuth finns på meta
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/'
  }
})

