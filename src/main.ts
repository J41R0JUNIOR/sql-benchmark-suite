import "dotenv/config";
import { createDefaultMysqlBenchmark } from "./benchmark/mysql";
import { createDefaultPostgresBenchmark } from "./benchmark/postgresql";

async function main() {
  const ops = 10000;

  const mysqlBenchmark = await createDefaultMysqlBenchmark();
  await mysqlBenchmark.completeBenchmark(ops);

  const postgresBenchmark = await createDefaultPostgresBenchmark();
  await postgresBenchmark.completeBenchmark(ops);

  console.log("\nBenchmark finished.");
}

main();
