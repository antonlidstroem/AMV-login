export const apiClient = {
  async login(username: string, password: string) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error('Login failed')
    return res.json()
  },

  async verifyCode(code: string) {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    if (!res.ok) throw new Error('Invalid code')
    return res.json()
  }
}
