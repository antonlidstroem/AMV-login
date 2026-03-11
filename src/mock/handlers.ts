import { http, HttpResponse, delay } from 'msw'
import { users } from './users'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string }
    await delay(1000)
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      return HttpResponse.json({ success: true, user })
    }
    return new HttpResponse(null, { status: 401 })
  }),

  http.post('/api/verify-code', async ({ request }) => {
    const { code } = await request.json() as { code: string }
    await delay(800)
    if (code === '1234') {
      return HttpResponse.json({ success: true })
    }
    return new HttpResponse(null, { status: 400 })
  }),

  http.post('/api/reset-password', async ({ request }) => {
    const { password } = await request.json() as { password: string }
    await delay(1500)

    // SIMULERA ETT FEL: 
    // Om lösenordet är "fail", skicka ett felmeddelande
    if (password === 'DenyChange123!') {
      return new HttpResponse(
        JSON.stringify({ message: 'Servern nekar ändringen (Simulerat fel)' }), 
        { status: 400 }
      )
    }

    // Annars: Success som vanligt
    console.log(`Backend-simulering: Lösenordet ändrat till "${password}".`);
    return HttpResponse.json({ success: true })
  }),

  http.post('/api/contact', async ({ request }) => {
    const payload = await request.json() as { name: string; email: string; message: string }
    
    // Simulera nätverksfördröjning
    await delay(1200)

    // Logga resultatet för att verifiera testet
    console.log('%c [BACKEND MOCK] Nytt kontaktmeddelande mottaget:', 'color: #80AC2F; font-weight: bold;');
    console.table(payload);

    return HttpResponse.json({ success: true })
  }),
]
