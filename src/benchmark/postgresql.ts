
import postgres from "postgres";
import { dbTestSchemaSetup } from "../connection/postgresql";
import { measure } from "../util/measure";
import { saveBenchmarkResults } from "../util/saveResults";

export async function benchmarkPostgres(
  db: postgres.Sql,
  ops: number = 10000
) {
  console.log("\n--- PostgreSQL Benchmark ---");

  const benchmarkResults: string[] = [];

  await dbTestSchemaSetup(db);

  await measure(`INSERT ${ops}`, async () => {
    for (let i = 0; i < ops; i++) {
      await db`INSERT INTO test(value) VALUES (${i})`;
    }
  }, benchmarkResults);

  await measure("SELECT COUNT", async () => {
    await db`SELECT COUNT(*) FROM test`;
  }, benchmarkResults);

  await db.end();

  saveBenchmarkResults(benchmarkResults, "postgresql");
}
