import { BenchmarkInterface } from "./benchmarkInterface";
import { mysqlConnection, mysqlSchemaSetup } from "../connection/mysql";
import mysql from "mysql2/promise";
import { measure } from "../util/measure";
import { saveBenchmarkResults } from "../util/saveResults";

export class MySQLBenchmark implements BenchmarkInterface {
  name = "MySQL";
  db: mysql.Connection;

  constructor(db: mysql.Connection) {
    this.db = db;
  }

  async completeBenchmark(n: number): Promise<void> {
    const results: string[] = [];

    await measure("SETUP", () => mysqlSchemaSetup(this.db), results);
    await measure(`INSERT ${n}`, () => this.writeBenchmark(n), results);
    await measure("SELECT *", () => this.readBenchmark(0), results);

    saveBenchmarkResults(results, this.name, n);

    await this.db.end();
  }

  async writeBenchmark(n: number): Promise<number> {
    const start = performance.now();

    for (let i = 0; i < n; i++) {
      await this.db.execute(`INSERT INTO test(value) VALUES (?)`, [i]);
    }

    return performance.now() - start;
  }

  async readBenchmark(_: number): Promise<number> {
    const start = performance.now();

    await this.db.execute(`SELECT * FROM test`);

    return performance.now() - start;
  }
}

export async function createDefaultMysqlBenchmark() {
  const db = await mysqlConnection();
  return new MySQLBenchmark(db);
}
