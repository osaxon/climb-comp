import { db, pool } from ".";
import { users } from "./schema";

async function seed() {
    try {
        await db.insert(users).values({
            name: "Oli",
        });
        await pool.end();
        console.log("🌱 seeded");
    } catch (error) {
        console.error(error);
    }
}

seed();
