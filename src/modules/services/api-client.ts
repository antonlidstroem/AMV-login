import axios from 'axios'

// --- 1. Definiera typerna för dina svar ---
export interface AuthUser {
  id: string;
  username: string;
  // Lägg till fler fält om din backend skickar mer (t.ex. email, roll)
}

export interface LoginResponse {
  user: AuthUser;
  token?: string;
}

// --- 2. Skapa instansen ---
const api = axios.create({
  //ÄNDRA TILL BACKENDS URL FÖR ATT KOPPLA PÅ
  baseURL: '/api', 
  headers: { 'Content-Type': 'application/json' }
})

// --- 3. Interceptor (Unwrapper) ---
api.interceptors.response.use(
  (response) => {
    if (response.status === 204) return null
    return response.data 
  },
  (error) => {
    const message = error.response?.data?.message || 'Ett oväntat fel uppstod'
    return Promise.reject({ 
      status: error.response?.status, 
      message 
    })
  }
)

// --- 4. Exportera klienten med typer ---
export const apiClient = {
 
  login: (username: string, password: string) => 
    api.post('/login', { username, password }) as unknown as Promise<LoginResponse>,

  verifyCode: (code: string) => 
    api.post('/verify-code', { code }) as unknown as Promise<{ success: boolean }>,

  resetPassword: (password: string) => 
    api.post('/reset-password', { password }) as unknown as Promise<{ success: boolean }>,

  sendContactMessage: (payload: { name: string; email: string; message: string }) => 
    api.post('/contact', payload) as unknown as Promise<{ message: string }>
}