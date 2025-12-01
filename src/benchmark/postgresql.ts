import { BenchmarkInterface } from "./benchmarkInterface";
import { measure } from "../util/measure";
import { saveBenchmarkResults } from "../util/saveResults";
import postgres from "postgres";
import { postgresConnection, postgresSchemaSetup } from "../connection/postgresql";

export class PostgreSQLBenchmark implements BenchmarkInterface {
  name = "PostgreSQL";
  db: postgres.Sql;

  constructor(db: postgres.Sql) {
    this.db = db;
  }

  async completeBenchmark(n: number): Promise<void> {
    const results: string[] = [];

    await measure("SETUP", () => postgresSchemaSetup(this.db), results);
    await measure(`INSERT ${n}`, () => this.writeBenchmark(n), results);
    await measure("SELECT COUNT", () => this.readBenchmark(0), results);

    saveBenchmarkResults(results, this.name);

    await this.db.end();
  }

  async writeBenchmark(n: number): Promise<number> {
    const start = performance.now();

    for (let i = 0; i < n; i++) {
      await this.db`INSERT INTO test(value) VALUES (${i})`;
    }

    return performance.now() - start;
  }

  async readBenchmark(_: number): Promise<number> {
    const start = performance.now();

    await this.db`SELECT COUNT(*) FROM test`;

    return performance.now() - start;
  }
}

export async function createDefaultPostgresBenchmark() {
  const db = await postgresConnection();
  return new PostgreSQLBenchmark(db);
}
