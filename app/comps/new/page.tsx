import { getUserAndFollowers } from "@/actions/users";
import { getPageSession } from "@/auth/lucia";
import { db } from "@/db";

export default async function NewCompPage({
    searchParams,
}: {
    searchParams: { loc: string; lives: number };
}) {
    const location = await db.query.locations.findFirst({
        where: (locations, { eq }) =>
            eq(locations.id, Number(searchParams.loc)),
    });
    const session = await getPageSession();

    if (!session) {
        return <div>Sign in to start a new comp</div>;
    }

    const user = await getUserAndFollowers(session.user.userId);

    console.log(user);

    return (
        <main>
            <h1>Add players</h1>
            <pre>{JSON.stringify(location, null, 2)}</pre>
            <p>Start a new bouldering comp</p>
        </main>
    );
}
