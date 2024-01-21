import { getUserAndFollowers } from "@/actions/users";
import { getPageSession } from "@/auth/lucia";
import { db } from "@/db";
import { compParticipants, comps } from "@/db/schema";
import { redirect } from "next/navigation";
import UserSelection from "../user-selection";

export default async function NewCompPage({
    searchParams,
}: {
    searchParams: { loc: string; lives: number; users: string };
}) {
    const session = await getPageSession();

    if (!session) {
        return <div>Sign in to start a new comp</div>;
    }

    const participants = searchParams.users?.split(",") || [];

    if (participants.length) {
        console.log("participants", participants);
        // 1. Create a new comp
        const comp = await db
            .insert(comps)
            .values({
                locationId: Number(searchParams.loc),
            })
            .returning();
        // 2. Create a new comp_participant for each participant
        participants.push(session.user.userId);
        for (const participant of participants) {
            await db.insert(compParticipants).values({
                compId: comp[0].id,
                userId: participant,
                locationId: Number(searchParams.loc),
                remainingAttempts: Number(searchParams.lives),
                score: 0,
            });
        }
        // 3. Redirect to /comps/:id
        if (comp) {
            redirect(`/comps/${comp[0].id}`);
        }
    }

    const user = await getUserAndFollowers(session.user.userId);

    return (
        <main>
            {participants.length === 0 ? (
                <UserSelection users={user?.followed_by} />
            ) : (
                <p>creating comp...</p>
            )}
        </main>
    );
}
