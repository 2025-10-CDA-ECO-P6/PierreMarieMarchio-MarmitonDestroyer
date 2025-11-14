import { User } from "../../common/entities";


export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  add(user: User): Promise<void>;
}
