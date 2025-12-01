import { SQLiteClient, sqliteConnection, sqliteSchemaSetup } from "../connection/sqlite";
import { BenchmarkInterface } from "./benchmarkInterface";
import { measure } from "../util/measure";
import { saveBenchmarkResults } from "../util/saveResults";

export class SQLiteBenchmark implements BenchmarkInterface {
  name = "SQLite";
  db!: SQLiteClient;

  constructor(db: SQLiteClient) {
    this.db = db;
  }

  async completeBenchmark(n: number): Promise<void> {
    const results: string[] = [];

    await measure("SETUP", () => sqliteSchemaSetup(this.db), results);
    await measure(`INSERT ${n}`, () => this.writeBenchmark(n), results);
    await measure("SELECT *", () => this.readBenchmark(0), results);

    saveBenchmarkResults(results, this.name, n);
  }

  async writeBenchmark(n: number): Promise<number> {
    const start = performance.now();

    for (let i = 0; i < n; i++) {
      this.db.exec(`INSERT INTO test(value) VALUES (${i})`)
    }

    return performance.now() - start;
  }

  async readBenchmark(_: number): Promise<number> {
    const start = performance.now();

    this.db.exec(`SELECT * FROM test`);

    return performance.now() - start;
  }
}

export async function createDefaultSqliteBenchmark() {
  const db = await sqliteConnection();
  return new SQLiteBenchmark(db);
}
