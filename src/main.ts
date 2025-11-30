import { benchmarkPostgres } from "./benchmark/postgresql";
import { getPostgresClient } from "./connection/postgresql";
import "dotenv/config";

async function main() {
    const client = await getPostgresClient();
    await benchmarkPostgres(client, 100000);
}

main();