import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../stores/authStore'

const routes=[
  { path:'/', component:()=>import('../App.vue') },
  { path:'/dashboard',
    component:()=>import('../components/dashboard.vue'),
    meta:{ requiresAuth:true }
  }
]

export const router = createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to)=>{

  if(to.meta.requiresAuth && !authStore.isAuthenticated){
    return '/'
  }
})
