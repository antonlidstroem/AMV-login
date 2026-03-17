import { defineStore } from 'pinia'
import axios from 'axios'

// 1. Hämta URL:en från Vite. Om den inte finns (t.ex. i lokala tester) 
// använder vi en tom sträng vilket innebär "relative path".
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface AuthUser {
  username: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null,
    pendingUser: null as AuthUser | null,
    isLoading: false, 
    error: null as string | null
  }),

  actions: {
    async login(credentials: { username: string; password: string }) {
      this.isLoading = true
      this.error = null
      try {
        // 2. Använd variabeln här!
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials)
        this.pendingUser = response.data.user
        return response.data.user 
      } catch (err: any) {
        this.error = 'Fel användarnamn eller lösenord'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    async loginWithBankId() {
      this.isLoading = true
      this.error = null
      try {
        // 3. Och här!
        const response = await axios.post(`${API_BASE_URL}/api/bankid/authenticate`)
        
        console.log("Store: API-svar mottaget:", response.data)

        if (response.data && response.data.user) {
          this.user = response.data.user
          return response.data.user
        } else {
          throw new Error("Inget användarobjekt i svaret")
        }
      } catch (err: any) {
        this.error = 'BankID-verifiering misslyckades'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    // ... resten av dina funktioner (setPendingUser, logout, completeLogin)
    setPendingUser(user: AuthUser) { this.pendingUser = user },
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
    },
    completeLogin() {
      this.isLoggedIn = true
    },

    async resendCode() {
      this.isLoading = true
      this.error = null
      try {
        // Detta anrop kommer att fångas upp av MSW
        await axios.post('/api/resend-code')
        return true
      } catch (err) {
        this.error = 'Kunde inte skicka ny kod'
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})