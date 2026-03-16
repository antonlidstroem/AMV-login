// En liten hjälpfunktion för att hantera responsen centralt
async function handleResponse(res: Response) {
  if (!res.ok) {
    // Försök hämta felmeddelande från backend, annars fallback
    const errorData = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      message: errorData.message || 'Ett oväntat fel uppstod'
    };
  }
  // Om det är 204 No Content (vanligt vid vissa POSTs), returnera inget
  if (res.status === 204) return null;
  
  return res.json();
}

export const apiClient = {
  async login(username: string, password: string) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res); // Returnerar user-objektet till AuthLoginForm
  },

  async verifyCode(code: string) {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    return handleResponse(res);
  },

  async resetPassword(password: string) {
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return handleResponse(res);
  },

  async sendContactMessage(payload: { name: string; email: string; message: string }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  }
};