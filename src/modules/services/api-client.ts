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
  // Use /api as base so MSW or your Proxy picks it up
  baseURL: '/api', 
  headers: { 'Content-Type': 'application/json' }
})

// --- 3. Interceptors ---
api.interceptors.response.use(
  (response) => response.data, // Unwrap data immediately
  (error) => {
    const message = error.response?.data?.message || 'Ett oväntat fel uppstod'
    return Promise.reject({ 
      status: error.response?.status, 
      message 
    })
  }
)

// --- 4. Exported Client ---
export const apiClient = {
  // We expose the raw instance if we need .post() directly in the store
  instance: api,

  // Typed helpers
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