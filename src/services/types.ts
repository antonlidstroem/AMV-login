export interface User {
  id: string;
  email: string;
  name: string;
}

export interface IAuthService {
  login(email: string, pass: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}