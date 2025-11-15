export interface UserContext {
  setUserId(userId: string): void;
  getUserId(): string;

  setEmail(email: string): void;
  getEmail(): string;

  setName(name: string): void;
  getName(): string;
}
