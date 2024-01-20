import { db } from "@/db";
import { followers } from "../db/schema";

export const getUserAndFollowers = async (userId: string) => {
    try {
        const user = await db.query.user.findFirst({
            where: (users, { eq }) => eq(users.id, userId),
            with: {
                following: {
                    with: {
                        following_user: {
                            columns: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
                followed_by: {
                    with: {
                        followed_by_user: {
                            columns: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        });
        return user;
    } catch (error) {
        console.log("🚨 Error getting user and followers");
        console.error(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
