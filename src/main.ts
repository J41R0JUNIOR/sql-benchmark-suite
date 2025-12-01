import "dotenv/config";
import { createDefaultMysqlBenchmark } from "./benchmark/mysql";
import { createDefaultPostgresBenchmark } from "./benchmark/postgresql";
import { createDefaultSqliteBenchmark } from "./benchmark/sqlite";

async function main() {
  const ops = 500000;

  const mysqlBenchmark = await createDefaultMysqlBenchmark();
  await mysqlBenchmark.completeBenchmark(ops);

  const postgresBenchmark = await createDefaultPostgresBenchmark();
  await postgresBenchmark.completeBenchmark(ops);

  const sqliteBenchmark = await createDefaultSqliteBenchmark();
  await sqliteBenchmark.completeBenchmark(ops);

  console.log("\nBenchmark finished.");
}

main();
