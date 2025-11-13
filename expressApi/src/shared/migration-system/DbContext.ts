import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Migration } from './Migration';

export abstract class DbContext {
  private db: Database | null = null;
  protected readonly migrations: Migration[] = [];

  constructor(private readonly dbPath: string = 'database.sqlite') {}

  addMigrations(migrations: Migration[]) {
    this.migrations.push(...migrations);
  }

  async connect(): Promise<Database> {
    this.db ??= await open({ filename: this.dbPath, driver: sqlite3.Database });
    return this.db;
  }

  async migrateAsync() {
    const db = await this.connect();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        executed_at TEXT NOT NULL
      )
    `);

    const executedRows = await db.all<{ id: string }[]>(
      `SELECT id FROM migrations`,
    );
    const executedIds = new Set(executedRows.map((r) => r.id));

    for (const migration of this.migrations) {
      if (!executedIds.has(migration.id)) {
        await migration.up(db);
        await db.run(
          'INSERT INTO migrations (id, executed_at) VALUES (?, ?)',
          migration.id,
          new Date().toISOString(),
        );
      }
    }
  }

  getDb(): Database {
    if (!this.db) throw new Error('DbContext not connected.');
    return this.db;
  }
}