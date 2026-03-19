import { defineStore } from 'pinia'
import { apiClient, type AuthUser } from '../services/api-client'
export type { AuthUser }

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
    // --- LOGIN FLÖDEN ---
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
        this.bankIdStatus = 'OUTSTANDING'
        return data
      } catch (err: any) {
        this.error = err.message || 'BankID kunde inte startas'
        throw err 
      } finally {
        this.isLoading = false
      }
    },

    // --- BANKID POLLING ---
    async pollBankIdStatus() {
      if (this.isPolling) return; 
      this.isPolling = true;

      while (this.isPolling) {
        try {
          const data = await apiClient.collectBankId();
          if (!this.isPolling) break;

          this.bankIdStatus = data.status;

          if (data.status === 'COMPLETE') {
            this.pendingUser = data.user;
            this.isPolling = false;
            // Här ska INGEN isLoggedIn = true finnas. 
            // Det sköts av confirmLogin() senare.
            break; 
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err) {
          this.stopPolling();
          break;
        }
      }
    },

    // --- 2FA & KOD-HANTERING (Dessa saknades i förra svaret) ---
    async verify2FA(code: string) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.verifyCode(code);
        this.confirmLogin(); // Flytta pendingUser -> user
        return true;
      } catch (err: any) {
        this.error = err.message || 'Ogiltig kod';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async resendCode() {
      this.isLoading = true;
      this.error = null;
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

    // --- LÖSENORDSHANTERING (Dessa saknades också) ---
    async requestPasswordReset(email: string) {
      this.isLoading = true;
      this.error = null;
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
      this.error = null;
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

    // --- STATE MANAGEMENT ---
    confirmLogin() {
      if (this.pendingUser) {
        this.user = this.pendingUser
        this.isLoggedIn = true
        this.pendingUser = null
        this.bankIdStatus = 'IDLE'
      }
    },

    stopPolling() {
      this.isPolling = false;
      this.bankIdStatus = 'IDLE';
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.pendingUser = null;
      this.error = null;
      this.bankIdStatus = 'IDLE';
      this.isPolling = false;
    }
  }
})