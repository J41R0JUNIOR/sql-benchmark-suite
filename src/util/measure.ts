export async function measure(label: string, fn: () => Promise<any>, results: string[]) {
  const start = performance.now();
  await fn();
  const end = performance.now();

  const result = `${label}: ${(end - start).toFixed(2)}ms`;
  console.log(result);
  results.push(result);
}