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
  })
]
