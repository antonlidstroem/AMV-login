import { defineStore } from 'pinia'
import axios from 'axios'

// 1. Hämta URL:en från Vite. Om den inte finns (t.ex. i lokala tester) 
// använder vi en tom sträng vilket innebär "relative path".
const API_BASE_URL = '';

export interface AuthUser {
  username: string
  name?: string
  bankIdStatus: 'IDLE' | 'OUTSTANDING' | 'USER_SIGN' | 'COMPLETE'
}


export type BankIdStatus = 'IDLE' | 'OUTSTANDING' | 'USER_SIGN' | 'COMPLETE';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as AuthUser | null,
    pendingUser: null as AuthUser | null,
    isLoading: false, 
    error: null as string | null,
    bankIdStatus: 'IDLE' as BankIdStatus,
    isPolling: false
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
    },

    async requestPasswordReset(email: string) {
      this.isLoading = true;
      this.error = null;
      try {
        // Detta anrop fångas upp av MSW
        await axios.post('/api/password-reset-request', { email });
        return true;
      } catch (err) {
        this.error = 'Kunde inte skicka återställningsmejl';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    authenticateBankId: async () => {
      const response = await axios.post('/api/bankid/authenticate');
      return response.data;
    },

  
    stopPolling() {
      this.isPolling = false;
      this.bankIdStatus = 'IDLE';
    },

   async pollBankIdStatus() {
      if (this.isPolling) return; 
      
      this.isPolling = true;
      this.bankIdStatus = 'OUTSTANDING';

      while (this.isPolling) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/bankid/collect`);
          const data = response.data;

          // Om någon anropat stopPolling under tiden vi väntade på svar
          if (!this.isPolling) break;

          if (data.status !== this.bankIdStatus) {
            this.bankIdStatus = data.status;
          }

          if (data.status === 'COMPLETE') {
            this.user = data.user;
            this.isPolling = false;
          } else {
            // Vänta 2 sekunder innan nästa check
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (err) {
          this.isPolling = false;
          this.bankIdStatus = 'IDLE';
          break;
        }
      }
    },

    async resendPasswordResetEmail(email: string) {
      this.isLoading = true;
      try {
        // Vi använder en relativ sökväg så att MSW fångar upp det direkt
        await axios.post('/api/password-reset-resend', { email });
        return true;
      } catch (err) {
        this.error = 'Kunde inte skicka om mejlet';
        throw err;
      } finally {
        this.isLoading = false;
      }
    }

  }
})