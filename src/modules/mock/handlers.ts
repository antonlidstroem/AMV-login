// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'
import { users } from './users'

let bankIdStep = 0; 

// Hjälpfunktion för snygga loggar
const mswLog = (icon: string, title: string, message: any = '', color: string = '#3498db') => {
  console.log(
    `%c${icon} [MSW] ${title.toUpperCase()}%c ${message}`,
    `color: ${color}; font-weight: bold;`,
    'color: inherit; font-weight: normal;'
  );
};

export const handlers = [
  // --- 1. LOGIN ---
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as any
    mswLog('🚀', 'Inloggning', username);
    await delay(1000);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      mswLog('✅', 'Login lyckades', user.username, '#27ae60');
      return HttpResponse.json({ success: true, user });
    }
    return new HttpResponse(null, { status: 401 });
  }),

  // --- 2. PASSWORD RESET REQUEST (Denna anropas av AuthPasswordResetRequest.vue) ---
  http.post('/api/password-reset-request', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    mswLog('📧', 'Reset-begäran', `Skapar länk för: ${email}`);
    
    await delay(1200);
    // Loggar ut länken i konsolen så du kan klicka på den för att testa i dev
    console.log(`%c[MSW] ✉️ MEJL SKICKAT TILL: ${email}\nLänk: http://localhost:5173/reset-password?token=mock-token`, 'background: #3498db; color: white; padding: 5px; border-radius: 4px;');
    
    return HttpResponse.json({ success: true });
  }),

  // --- 3. RESET PASSWORD (Denna anropas av AuthPasswordResetForm.vue via api-client) ---
  http.post('/api/reset-password', async ({ request }) => {
    const { password } = await request.json() as any
    mswLog('🔄', 'Lösenordsbyte', 'Spara nytt lösenord...');
    
    await delay(1500);
    
    // Scenario: Om man väljer detta specifika lösenord så simulerar vi ett serverfel
    if (password === 'DenyChange123!') {
      mswLog('❌', 'Byte nekat', 'Simulerat fel', '#c0392b');
      return new HttpResponse(
        JSON.stringify({ message: 'Lösenordet uppfyller inte säkerhetskraven (Simulerat)' }), 
        { status: 400 }
      );
    }
    
    mswLog('✅', 'Byte klart', 'Databasen uppdaterad', '#27ae60');
    return HttpResponse.json({ success: true });
  }),

  // --- 4. 2FA & RETRY ---
  http.post('/api/verify-code', async ({ request }) => {
    const { code } = await request.json() as any
    mswLog('🔐', '2FA', `Kod: ${code}`);
    await delay(800);
    if (code === '1234') return HttpResponse.json({ success: true });
    return new HttpResponse(null, { status: 400 });
  }),

  http.post('/api/resend-code', async () => {
    await delay(1000);
    mswLog('📲', 'SMS', 'Ny kod skickad');
    return HttpResponse.json({ success: true });
  }),

  // --- 5. BANKID: AUTHENTICATE ---
  http.post('/api/bankid/authenticate', async () => {
    bankIdStep = 0; 
    mswLog('📱', 'BankID', 'Startar session...', '#9b59b6');
    await delay(1500);
    return HttpResponse.json({ 
      status: 'OUTSTANDING', // Lägg till denna!
      user: { username: 'sven_svensson', name: 'Sven Svensson' } 
    });
  }),

  // --- 6. BANKID: COLLECT (POLLING) ---
  http.post('/api/bankid/collect', async () => {
    await delay(1000);
    bankIdStep++;
    console.groupCollapsed(`%c🔍 [MSW] BankID Poll (Försök ${bankIdStep})`, 'color: #95a5a6;');

    if (bankIdStep < 2) {
      mswLog('⏳', 'Status', 'OUTSTANDING', '#7f8c8d');
      console.groupEnd();
      return HttpResponse.json({ status: 'OUTSTANDING' });
    } else if (bankIdStep === 2) {
      mswLog('📱', 'Status', 'USER_SIGN', '#e67e22');
      console.log('%c[MSW] Simulering: Användaren har nu skannat QR-koden.', 'color: #e67e22;');
      console.groupEnd();
      return HttpResponse.json({ status: 'USER_SIGN' });
    } else {
      mswLog('🎉', 'Status', 'COMPLETE', '#2ecc71');
      console.groupEnd();
      bankIdStep = 0; 
      return HttpResponse.json({ 
        status: 'COMPLETE', 
        user: { username: 'sven_svensson', name: 'Sven Svensson' } 
      });
    }
  }),

  // --- 7. KONTAKT ---
  http.post('/api/contact', async () => {
    await delay(1000);
    mswLog('📩', 'Kontakt', 'Mottaget');
    return HttpResponse.json({ success: true });
  }),

  // --- 8. RESEND PASSWORD RESET EMAIL (Anropas av AuthPasswordResetRetry.vue) ---
  http.post('/api/password-reset-resend', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    mswLog('📧', 'Resend Reset', `Skickar NY länk till: ${email}`, '#f39c12');
    
    await delay(1500); // Lite längre delay för att spinnern ska synas ordentligt
    
    console.log(`%c[MSW] ✉️ NYTT MEJL SKICKAT TILL: ${email}\nLänk: http://localhost:5173/reset-password?token=new-mock-token`, 'background: #f39c12; color: white; padding: 5px; border-radius: 4px;');
    
    return HttpResponse.json({ success: true });
  }),
]