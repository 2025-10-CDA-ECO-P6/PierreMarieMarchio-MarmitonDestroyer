export interface AuthService {
  login(request: {
    password: string;
    email: string;
  }): Promise<{ token: string }>;
  register(request: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string }>;
}
