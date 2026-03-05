import { users } from './users'
// Om du har en User-typ i dina types, importera den gärna här
// import type { User } from '../types/user' 

export function loginMock(username: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // TypeScript vet nu att u.username och u.password ska jämföras med strängar
      const user = users.find(u => u.username === username && u.password === password)
      
      if (user) {
        resolve(user)
      } else {
        // Vi skickar med samma felmeddelande som du hade tidigare
        reject("Fel användarnamn eller lösenord")
      }
    }, 1000)
  })
}