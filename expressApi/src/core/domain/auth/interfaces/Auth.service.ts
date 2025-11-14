import { User } from "../../common/entities";

export interface AuthService {
  login(request: {
    password: string;
    email: string;
  }): Promise<{ token: string; user: User }>;
  register(request: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }>;
}
