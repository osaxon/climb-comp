import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username, password);
    // basic check
    // if (formData.values()) {
    //     return new Response(null, {
    //         status: 200,
    //     });
    // }

    if (
        typeof username !== "string" ||
        username.length < 4 ||
        username.length > 31
    ) {
        return NextResponse.json(
            {
                error: "Invalid username",
            },
            {
                status: 400,
            }
        );
    }
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return NextResponse.json(
            {
                error: "Invalid password",
            },
            {
                status: 400,
            }
        );
    }
    try {
        console.log("creating user");
        const user = await auth.createUser({
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                username,
            },
        });
        console.log("creating session");
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        console.log("setting session");
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/", // redirect to profile page
            },
        });
    } catch (e) {
        // this part depends on the database you're using
        // check for unique constraint error in user table
        console.error(e);
        if (
            // e instanceof SomeDatabaseError &&
            (e as Error).message ===
            "duplicate key value violates unique constraint"
        ) {
            return NextResponse.json(
                {
                    error: "Username already taken",
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json(
            {
                error: "An unknown error occurred",
            },
            {
                status: 500,
            }
        );
    }
};
