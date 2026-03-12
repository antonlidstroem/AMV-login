// stores/auth.ts
import { defineStore } from 'pinia'

// 1. Lägg till export här!
export interface AuthUser {
  username: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null,
    pendingUser: null as AuthUser | null 
  }),
  actions: {
    setPendingUser(user: AuthUser) {
      this.pendingUser = user
    },
    confirmLogin() {
      if (this.pendingUser) {
        this.isLoggedIn = true
        this.user = this.pendingUser
        this.pendingUser = null
      }
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      this.pendingUser = null
    }
  }
})