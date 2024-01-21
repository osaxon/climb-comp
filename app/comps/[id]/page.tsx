import { db } from "@/db";

export default async function SingleCompPage({
    params,
}: {
    params: { id: number };
}) {
    const comp = await db.query.comps.findFirst({
        where: (comps, { eq }) => eq(comps.id, params.id),
        with: {
            participants: true,
            location: true,
            attempts: true,
        },
    });
    return (
        <main>
            <h1>Single Comp Page</h1>
            <pre>
                <code>{JSON.stringify(comp, null, 2)}</code>
            </pre>
        </main>
    );
}
