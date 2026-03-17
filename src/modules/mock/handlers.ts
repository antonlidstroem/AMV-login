import { http, HttpResponse, delay } from 'msw'
import { users } from './users'

export const handlers = [
  // 1. LOGIN
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as any
    console.log(`%c[MSW] Försöker logga in användare: ${username}`, 'color: #3498db; font-weight: bold;');
    
    await delay(1500)
    
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      console.log('%c[MSW] Login lyckades!', 'color: #27ae60; font-weight: bold;');
      return HttpResponse.json({ success: true, user })
    }
    
    console.warn('%c[MSW] Login misslyckades: Felaktiga uppgifter', 'color: #c0392b; font-weight: bold;');
    return new HttpResponse(null, { status: 401 })
  }),

  // 2. VERIFY CODE (2FA)
  http.post('/api/verify-code', async ({ request }) => {
    const { code } = await request.json() as any
    console.log(`%c[MSW] Verifierar 2FA-kod: ${code}`, 'color: #3498db');
    
    await delay(800)
    
    if (code === '1234') {
      console.log('%c[MSW] Kod korrekt!', 'color: #27ae60');
      return HttpResponse.json({ success: true })
    }
    
    console.error(`%c[MSW] Felaktig kod: ${code}. Tips: använd 1234`, 'color: #c0392b');
    return new HttpResponse(null, { status: 400 })
  }),

  // 3. RESET PASSWORD
  http.post('/api/reset-password', async ({ request }) => {
    const { password } = await request.json() as any
    console.log('%c[MSW] Begäran om nytt lösenord mottagen', 'color: #3498db');
    
    await delay(1500)

    if (password === 'DenyChange123!') {
      console.error('%c[MSW] Simulerar serverfel (Lösenordet nekat)', 'color: #c0392b');
      return new HttpResponse(
        JSON.stringify({ message: 'Servern nekar ändringen (Simulerat fel)' }), 
        { status: 400 }
      )
    }
    
    console.log('%c[MSW] Lösenordet har ändrats i databasen', 'color: #27ae60');
    return HttpResponse.json({ success: true })
  }),

  // 4. CONTACT
  http.post('/api/contact', async ({ request }) => {
    const payload = await request.json() as any
    await delay(1200)
    console.log('%c[MSW] Kontaktmeddelande mottaget:', 'background: #222; color: #bada55', payload);
    return HttpResponse.json({ success: true })
  }),

  // 5. BANKID
  http.post('/api/bankid/authenticate', async () => {
    console.log('%c[MSW] BankID-session startad. Väntar på scanning...', 'color: #9b59b6; font-style: italic;');
    
    await delay(3000);

    // --- SCENARIO 1: Succé (Kommentera bort för att testa fel) ---
    /*
    console.log('%c[MSW] BankID: Användaren har scannat QR-koden!', 'color: #27ae60; font-weight: bold;');
    return HttpResponse.json({ 
      success: true, 
      user: { username: 'sven_svensson', name: 'Sven Svensson' } 
    });
    */

    // --- SCENARIO 2: Fel ---
    console.error('%c[MSW] BankID: Sessionen avbröts eller timeout', 'color: #c0392b; font-weight: bold;');
    return new HttpResponse(null, { status: 403 }); 
  }),
  
  // 6. RESEND CODE
  http.post('/api/resend-code', async () => {
    await delay(1000)
    console.log('%c[MSW] Ny SMS-kod genererad och skickad!', 'color: #f39c12; font-weight: bold;')
    return HttpResponse.json({ success: true })
  }),

  // 7. PASSWORD RESET REQUEST (EMAIL)
  http.post('/api/password-reset-request', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    await delay(1200);
    
    console.log(`%c[MSW] Genererar återställningslänk för: ${email}`, 'color: #3498db');
    console.log(`%c[MSW] MEJL SKICKAT: http://localhost:5173/reset-password?token=mock-token-123`, 'background: #3498db; color: white; padding: 2px 5px;');
    
    return HttpResponse.json({ success: true });
  }),
]