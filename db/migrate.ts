import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pool, db } from "./index";

// This will run migrations on the database, skipping the ones already applied
try {
    console.log("migrating database");
    await migrate(db, { migrationsFolder: "./drizzle" });
    await pool.end();
    console.log("migrations complete");
} catch (error) {
    console.log(error);
}
