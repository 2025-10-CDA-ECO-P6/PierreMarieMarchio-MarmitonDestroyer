import { Database } from 'sqlite';
import { UserRepository } from '../../../core/domain/common/interfaces';
import { User } from '../../../core/domain/common/entities';
import { DbContext } from '../../../shared/migration-system/DbContext';

export class UserSQLiteRepository implements UserRepository {
  constructor(private readonly context: DbContext) {}

  private get db(): Database {
    return this.context.getDb();
  }

  async add(user: User): Promise<void> {
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

  async findAll(): Promise<User[]> {
    const rows = await this.db.all(`SELECT * FROM users`);
    return rows.map(
      (row: any) =>
        new User(
          row.id,
          row.name,
          row.email,
          row.password,
          new Date(row.createdAt),
          new Date(row.updatedAt),
        ),
    );
  }

  async update(user: User): Promise<void> {
    await this.db.run(
      `UPDATE users
       SET name=?, email=?, password=?, createdAt=?, updatedAt=?
       WHERE id=?`,
      user.name,
      user.email,
      user.password,
      user.createdAt.toISOString(),
      user.updatedAt.toISOString(),
      user.id,
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM users WHERE id = ?`, id);
  }
}
