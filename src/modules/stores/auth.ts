import { defineStore } from 'pinia'
import { apiClient, type AuthUser } from '../services/api-client'

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
        const data = await apiClient.login(credentials)
        this.pendingUser = data.user
        return data.user 
      } catch (err: any) {
        this.error = err.message || 'Fel användarnamn eller lösenord'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    async loginWithBankId() {
      this.isLoading = true
      this.error = null
      try {
        const data = await apiClient.authenticateBankId()
        if (data && data.user) {
          this.user = data.user
          return data.user
        }
        throw new Error("Inget användarobjekt i svaret")
      } catch (err: any) {
        this.error = err.message || 'BankID-verifiering misslyckades'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    async pollBankIdStatus() {
      if (this.isPolling) return; 
      this.isPolling = true;
      this.bankIdStatus = 'OUTSTANDING';

      while (this.isPolling) {
        try {
          const data = await apiClient.collectBankId();

          if (!this.isPolling) break;

          if (data.status !== this.bankIdStatus) {
            this.bankIdStatus = data.status;
          }

          if (data.status === 'COMPLETE') {
            this.user = data.user;
            this.isLoggedIn = true;
            this.isPolling = false;
          } else {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (err) {
          this.stopPolling();
          break;
        }
      }
    },

    async resendCode() {
      this.isLoading = true;
      try {
        await apiClient.resendCode();
        return true;
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async requestPasswordReset(email: string) {
      this.isLoading = true;
      try {
        await apiClient.requestPasswordReset(email);
        return true;
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async resendPasswordResetEmail(email: string) {
      this.isLoading = true;
      try {
        await apiClient.resendPasswordReset(email);
        return true;
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    stopPolling() {
      this.isPolling = false;
      this.bankIdStatus = 'IDLE';
    },

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
      this.stopPolling();
    }
  }
})