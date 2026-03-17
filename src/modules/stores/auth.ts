import { defineStore } from 'pinia'
import axios from 'axios'

export interface AuthUser {
  username: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null,
    pendingUser: null as AuthUser | null, // Viktig för 2FA!
    isLoading: false, 
    error: null as string | null
  }),

  actions: {
    // Denna sköter inloggningen och spinnern
    async login(credentials: { username: string; password: string }) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/login', credentials)
        // Vi sätter pendingUser istället för user direkt (för 2FA-flödet)
        this.pendingUser = response.data.user
        return response.data.user 
      } catch (err: any) {
        this.error = 'Fel användarnamn eller lösenord'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    // Dina originalfunktioner för 2FA-processen
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
      this.error = null
    }
  }
})