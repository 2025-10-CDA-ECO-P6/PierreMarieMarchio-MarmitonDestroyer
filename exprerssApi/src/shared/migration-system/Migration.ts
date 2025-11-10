import { Database } from "sqlite";

export type Migration = {
  id: string;
  up: (db: Database) => Promise<void>;
};
