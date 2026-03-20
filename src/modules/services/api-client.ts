import axios from 'axios'

// ── Types ──────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string
  username: string
  name?: string
  bankIdStatus: 'IDLE' | 'OUTSTANDING' | 'USER_SIGN' | 'COMPLETE'
}

export interface LoginResponse {
  user: AuthUser
  token?: string
}

// ── Axios instance ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── Response interceptor ───────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Ett oväntat fel uppstod'
    return Promise.reject({ status: error.response?.status, message })
  },
)

// ── Exported client ────────────────────────────────────────────────────────────
export const apiClient = {
  instance: api,

  async resetPassword(token: string, password: string): Promise<any> {
    return api.post('/reset-password', { token, password })
  },

  /** Fixed: endpoint matches the MSW handler registered at /api/contact */
  async sendContactMessage(data: { name: string; email: string; message: string }): Promise<any> {
    return api.post('/contact', data)
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
    api.post('/resend-code'),
}
