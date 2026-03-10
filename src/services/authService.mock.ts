import { IAuthService, User } from './types';

export class MockAuthService implements IAuthService {
  async login(email: string): Promise<User> {
    console.log("Mock: Loggar in...");
    return { id: '123', email, name: 'Test Testsson' };
  }

  async logout(): Promise<void> {
    console.log("Mock: Loggar ut");
  }

  async getCurrentUser(): Promise<User | null> {
    return { id: '123', email: 'test@test.se', name: 'Test Testsson' };
  }
}