import mysql from "mysql2/promise";

let client: mysql.Connection | null = null;

export async function mysqlConnection() {
  if (!client) {
    client = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    });
  }
  return client;
}

export async function mysqlSchemaSetup(db: mysql.Connection) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS test (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value INT NOT NULL
    );
  `);

  await db.query(`TRUNCATE TABLE test`);
}
