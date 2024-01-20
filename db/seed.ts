import { db, pool } from ".";
import { followers, following, grades, locations, user } from "./schema";
import { auth } from "@/auth/lucia";
import {
    grades as gradesData,
    users as userData,
    locations as locationData,
} from "./seedData.json";

async function seed() {
    try {
        await insertGrades(gradesData);
        await insertUsers(userData);
        await insertLocations(locationData);
        await setFollowers(userData);
        console.log("🌱 Seeding complete!");
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

async function insertGrades(values: { name: string; value: number }[]) {
    await db.delete(grades);
    await db.insert(grades).values(values);
    console.log("✅ Grades seeded!");
}

async function insertUsers(values: { id: string; username: string }[]) {
    for (const value of values) {
        try {
            await auth.deleteKey("username", value.username.toLowerCase());
            await auth.deleteUser(value.id);
            await auth.createUser({
                userId: value.id,
                key: {
                    providerId: "username",
                    providerUserId: value.username.toLowerCase(),
                    password: value.username.toLowerCase(),
                },
                attributes: {
                    username: value.username,
                },
            });
        } catch (error) {
            console.error("error inserting user", error);
        }
    }
    console.log("✅ Users seeded!");
}

async function insertLocations(values: { name: string }[]) {
    await db.delete(locations);
    await db.insert(locations).values(values);
    console.log("✅ Locations seeded!");
}

async function setFollowers(values: { id: string; username: string }[]) {
    await db.delete(followers);
    await db.delete(following);
    for (const user of values) {
        if (user.id === "8j6godwbjh5i7kc") return;
        await db.insert(followers).values({
            user_id: "8j6godwbjh5i7kc",
            followed_by_id: user.id,
        });
        await db.insert(following).values({
            user_id: user.id,
            following_id: "8j6godwbjh5i7kc",
        });
        if (user.id === "test-user-003") {
            await db.insert(following).values({
                user_id: "8j6godwbjh5i7kc",
                following_id: user.id,
            });
            await db.insert(followers).values({
                user_id: user.id,
                followed_by_id: "8j6godwbjh5i7kc",
            });
        }
    }
    console.log("✅ Followers seeded!");
}

async function selectGrades() {
    try {
        const result = await db.query.grades.findMany();
        console.log("📝 Grades:");
        console.table(result);
    } catch (error) {
        console.error(error);
    }
}

async function selectUsers() {
    const result = await db.query.user.findMany();
    console.log("📝 Users:");
    console.table(result);
}

async function selectLocations() {
    const result = await db.query.locations.findMany();
    console.log("📝 Locations:");
    console.table(result);
}

seed();
