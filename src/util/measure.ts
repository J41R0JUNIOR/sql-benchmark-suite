export async function measure<T>(
  label: string,
  fn: () => Promise<T>,
  results: string[]
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  const msg = `${label}: ${(end - start).toFixed(2)}ms`;
  console.log(msg);
  results.push(msg);

  return result;
}
