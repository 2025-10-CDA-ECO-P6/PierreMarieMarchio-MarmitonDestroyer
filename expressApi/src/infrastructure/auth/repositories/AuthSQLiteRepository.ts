import { Database } from 'sqlite';
import { User } from '../../../core/domain/common/entities/User';
import { AuthDbContext } from '../persistence/contexts/AuthDbContext';
import { AuthRepository } from '../../../core/domain/auth/interfaces';

export class AuthSQLiteRepository implements AuthRepository {
  constructor(private readonly context: AuthDbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async create(user: User): Promise<void> {
    await this.db.run(
      `INSERT INTO users (id, name, email, password, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt.toISOString(),
      user.updatedAt.toISOString(),
    );
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.db.get(`SELECT * FROM users WHERE id = ?`, id);
    if (!row) return null;
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.db.get(`SELECT * FROM users WHERE email = ?`, email);
    if (!row) return null;
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }
}
