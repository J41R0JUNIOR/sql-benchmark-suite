import fs from "fs";
import path from "path";

export function saveBenchmarkResults(
  results: string[],
  dbName: string,
  ops: number
) {
  const folder = `src/benchmark/results/${ops}/${dbName}`;
  const resultsDir = path.resolve(process.cwd(), folder);

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(resultsDir, `results-${timestamp}.txt`);

  fs.writeFileSync(filePath, results.join("\n"), "utf-8");
  console.log(`\n${dbName.toUpperCase()} - Results saved to ${filePath}`);
}