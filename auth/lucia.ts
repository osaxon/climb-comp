// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "@/db";

export const auth = lucia({
    env: "DEV",
    middleware: nextjs_future(),
    sessionCookie: {
        expires: false,
    },
    adapter: pg(pool, {
        user: "auth_user",
        session: "user_session",
        key: "user_key",
    }),

    getUserAttributes(data) {
        return {
            username: data.username,
        };
    },
});

export type Auth = typeof auth;
