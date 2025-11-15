import { UserContext } from '../../../core/domain/common/interfaces';

export class UserContextImpl implements UserContext {
  private userId?: string;
  private email?: string;
  private name?: string;

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string {
    if (!this.userId) {
      throw new Error('userId not set in UserContext');
    }
    return this.userId;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    if (!this.email) {
      throw new Error('email not set in UserContext');
    }
    return this.email;
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    if (!this.name) {
      throw new Error('name not set in UserContext');
    }
    return this.name;
  }
}