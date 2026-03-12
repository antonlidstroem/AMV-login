// stores/auth.ts
import { defineStore } from 'pinia'

export interface AuthUser {
  username: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null,
    pendingUser: null as AuthUser | null,
    
    // Säkerhets-state (laddas från localStorage om det finns)
    failedAttempts: Number(localStorage.getItem('auth_failed_attempts')) || 0,
    lockoutUntil: Number(localStorage.getItem('auth_lockout_until')) || 0,
  }),

  getters: {
    // Returnerar true om vi är inom spärrtiden
    isLockedOut: (state) => {
      return Date.now() < state.lockoutUntil
    },
    // Räknar ut sekunder kvar för visning i UI
    lockoutSecondsLeft: (state) => {
      return Math.max(0, Math.ceil((state.lockoutUntil - Date.now()) / 1000))
    }
  },

  actions: {
    // Registrera ett misslyckat försök
    registerFailure() {
      this.failedAttempts++
      localStorage.setItem('auth_failed_attempts', this.failedAttempts.toString())

      if (this.failedAttempts >= 3) {
        const duration = 30 * 1000 // 30 sekunder
        this.lockoutUntil = Date.now() + duration
        localStorage.setItem('auth_lockout_until', this.lockoutUntil.toString())
      }
    },

    // Nollställ säkerhetsspärren (körs vid lyckad inloggning)
    resetSecurity() {
      this.failedAttempts = 0
      this.lockoutUntil = 0
      localStorage.removeItem('auth_failed_attempts')
      localStorage.removeItem('auth_lockout_until')
    },

    setPendingUser(user: AuthUser) {
      this.pendingUser = user
    },

    confirmLogin() {
      if (this.pendingUser) {
        this.isLoggedIn = true
        this.user = this.pendingUser
        this.pendingUser = null
        this.resetSecurity() // Vi nollställer spärren när man lyckas
      }
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
      this.pendingUser = null
      // Man kan välja att inte nollställa security här för extra säkerhet
    }
  }
})