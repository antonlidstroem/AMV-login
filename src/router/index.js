import { createRouter, createWebHistory } from 'vue-router'

const routes=[
  { path:'/', component:()=>import('../App.vue') },
  { path:'/dashboard',
    component:()=>import('../views/LoginView.vue'),
    meta:{ requiresAuth:true }
  }
]

export const router = createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to)=>{
  const isLoggedIn = localStorage.getItem('mockLogin')

  if(to.meta.requiresAuth && !isLoggedIn){
    return '/'
  }
})
