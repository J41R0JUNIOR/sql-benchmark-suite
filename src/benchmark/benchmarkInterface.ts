export interface BenchmarkInterface {
    name: string;
    writeBenchmark: (n: number) => Promise<number>;
    readBenchmark: (n: number) => Promise<number>;
}