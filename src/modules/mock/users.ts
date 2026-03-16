export interface User {
  username: string
  password: string
  name?: string
}

export const users: User[] = [
  { username: 'anton', password: '1234' },
  { username: 'admin', password: 'admin' }
]
