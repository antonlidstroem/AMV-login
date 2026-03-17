import { http, HttpResponse, delay } from 'msw'
import { users } from './users' // Din lista med testanvändare

export const handlers = [
  // 1. LOGIN
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as any
    await delay(1500) // Spinner-tid
    
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      return HttpResponse.json({ success: true, user })
    }
    return new HttpResponse(null, { status: 401 })
  }),

  // 2. VERIFY CODE (2FA)
  http.post('/api/verify-code', async ({ request }) => {
    const { code } = await request.json() as any
    await delay(800)
    if (code === '1234') {
      return HttpResponse.json({ success: true })
    }
    return new HttpResponse(null, { status: 400 })
  }),

  // 3. RESET PASSWORD (med ditt simulerade fel)
  http.post('/api/reset-password', async ({ request }) => {
    const { password } = await request.json() as any
    await delay(1500)

    if (password === 'DenyChange123!') {
      return new HttpResponse(
        JSON.stringify({ message: 'Servern nekar ändringen (Simulerat fel)' }), 
        { status: 400 }
      )
    }
    return HttpResponse.json({ success: true })
  }),

  // 4. CONTACT
  http.post('/api/contact', async ({ request }) => {
    const payload = await request.json() as any
    await delay(1200)
    console.log('[MSW] Kontaktmeddelande:', payload);
    return HttpResponse.json({ success: true })
  }),
]