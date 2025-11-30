import fs from "fs";
import path from "path";

export function saveBenchmarkResults(
  results: string[],
  dbName: string
) {
  const folder = process.env.SAVE_BENCHMARK_RESULTS_FOLDER || `src/benchmark/results/${dbName}`;
  const resultsDir = path.resolve(process.cwd(), folder);

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(resultsDir, `results-${timestamp}.txt`);

  fs.writeFileSync(filePath, results.join("\n"), "utf-8");
  console.log(`\nResults saved to ${filePath}`);
}