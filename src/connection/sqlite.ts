import Database from "better-sqlite3";

export type SQLiteClient = ReturnType<typeof Database>;

let client: SQLiteClient | null = null;

export async function sqliteConnection(): Promise<SQLiteClient> {
  if (!client) {
    client = new Database("sqlite.db");
    client.pragma("journal_mode = WAL");
  }
  return client;
}


export async function sqliteSchemaSetup(db: SQLiteClient) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value INTEGER NOT NULL
    );
  `);

  db.exec(`DELETE FROM test;`);
}
