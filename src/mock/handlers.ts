import { http, HttpResponse, delay } from 'msw'
import { users } from '../mock/users' // Vi återanvänder dina test-användare

export const handlers = [
  // Login anrop
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as any
    await delay(1000) // Behåll din realism-fördröjning

    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
      return HttpResponse.json({ success: true, user })
    } else {
      return new HttpResponse(null, { status: 401, statusText: 'Fel användarnamn eller lösenord' })
    }
  }),

  // Verifiera kod (2FA)
  http.post('/api/verify-code', async ({ request }) => {
    const { code } = await request.json() as any
    await delay(800)

    if (code === '1234') {
      return HttpResponse.json({ success: true })
    } else {
      return new HttpResponse(null, { status: 400 })
    }
  })
]