import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION,
});

const db = drizzle(pool, { schema });

pool.on("error", (err) =>
    console.error("Unexpected error on idle client", err)
);

export { db, pool };
