import { db, pool } from ".";

async function runChecks() {
    try {
        const data = await db.query.user.findMany();
        console.log(data);
        await pool.end();
    } catch (error) {
        console.error(error);
    }
}

runChecks();
