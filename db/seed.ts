import { db, pool } from ".";
import { users, compParticipants } from "./schema";

async function seed() {
    try {
        await db.query.users.findFirst({
            with: {
                followers: { with: { user: true } },
                following: { with: { user: true } },
            },
        });
        await db.insert(compParticipants).values({
            userId: "1",
            compId: 1,
        });
        await pool.end();
        console.log("🌱 seeded");
    } catch (error) {
        console.error(error);
    }
}

seed();
