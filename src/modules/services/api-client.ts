import axios from 'axios'

// --- 1. Types ---
export interface AuthUser {
  id: string;
  username: string;
  name?: string;
  bankIdStatus: 'IDLE' | 'OUTSTANDING' | 'USER_SIGN' | 'COMPLETE';
}

export interface LoginResponse {
  user: AuthUser;
  token?: string;
}

// --- 2. Instance Configuration ---
const api = axios.create({
  baseURL: '/api', 
  headers: { 'Content-Type': 'application/json' }
})

// --- 3. Interceptors ---
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Ett oväntat fel uppstod'
    return Promise.reject({ 
      status: error.response?.status, 
      message 
    })
  }
); // Semikolon här, inte kommatecken

// --- 4. Exported Client ---
export const apiClient = {
  instance: api,

  // FIX: Flytta in resetPassword hit och använd rätt variabel (api)
  async resetPassword(token: string, password: string): Promise<any> {
    // Eftersom baseURL är /api, behöver vi bara skriva /password-reset
    return api.post('/reset-password', { token, password });
  },

  async sendContactMessage(data: { name: string; email: string; message: string }): Promise<any> {
    // Om du använder axios-instansen internt:
    return this.instance.post('/contact/send', data);
    
    // Eller om du kör en enkel fetch/mock:
    // return axios.post('/contact/send', data);
  },

  login: (credentials: { username: string; password: string }) => 
    api.post<any, LoginResponse>('/login', credentials),

  authenticateBankId: () => 
    api.post<any, { user: AuthUser; status: string }>('/bankid/authenticate'),

  collectBankId: () => 
    api.post<any, { user: AuthUser; status: any }>('/bankid/collect'),

  verifyCode: (code: string) => 
    api.post('/verify-code', { code }),

  requestPasswordReset: (email: string) => 
    api.post('/password-reset-request', { email }),

  resendPasswordReset: (email: string) => 
    api.post('/password-reset-resend', { email }),

  resendCode: () => 
    api.post('/resend-code')
}