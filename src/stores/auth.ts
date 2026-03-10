// src/stores/auth.ts
import { defineStore } from 'pinia'

export interface AuthUser {
  username: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null
  }),

  actions: {
    login(user: AuthUser) {
      this.isLoggedIn = true
      this.user = user
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
    }
  }
})
