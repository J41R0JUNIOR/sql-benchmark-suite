import postgres from "postgres";

let client: postgres.Sql | null = null;

export async function postgresConnection(): Promise<postgres.Sql> {
  if (!client) {
    client = postgres({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    });
  }

  return client;
}

export async function postgresSchemaSetup(db: postgres.Sql) {
  db`
    CREATE TABLE IF NOT EXISTS test (
      id SERIAL PRIMARY KEY,
      value INTEGER NOT NULL
    );
  `;
  db`TRUNCATE TABLE test;`;
}
