// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "@/db";
import { cache } from "react";
import * as context from "next/headers";

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

export const getPageSession = cache(() => {
    const authRequest = auth.handleRequest("GET", context);
    return authRequest.validate() as Promise<Session>;
});

// TODO - move to types/app.d.ts
// Lucia does not export this type currently
export type Session = {
    user: { userId: string; username: string };
    sessionId: string;
    activePeriodExpiresAt: Date;
    idlePeriodExpiresAt: Date;
    state: "active" | "idle" | "expired";
    fresh: boolean;
    // ... other session data
};
