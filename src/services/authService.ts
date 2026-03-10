import axios from 'axios';
import { IAuthService, User } from './types';

const api = axios.create({ baseURL: 'https://api.dinapp.se' });

export class AuthService implements IAuthService {
  async login(email: string, pass: string): Promise<User> {
    const response = await api.post<User>('/login', { email, pass });
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/logout');
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await api.get<User>('/me');
    return response.data;
  }
}