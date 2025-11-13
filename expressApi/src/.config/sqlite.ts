import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function getDB(): Promise<Database> {
  if (db) return db;

  const dbPath = 'database.sqlite';

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return db;
}
