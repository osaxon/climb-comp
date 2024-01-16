import { db, pool } from ".";
import { users } from "./schema";

async function seed() {
    try {
        await pool.end();
        console.log("🌱 seeded");
    } catch (error) {
        console.error(error);
    }
}

seed();
