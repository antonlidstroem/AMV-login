// Define how a User object should look
export interface User {
  username: string;
  password: string;
  name?: string; // Frågetecknet gör 'name' valfritt
}

export const users: User[] = [
  { username: 'anton', password: '1234' },
  { username: 'admin', password: 'admin' }
];