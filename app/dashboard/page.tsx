import { NewCompCard } from "@/components/new-comp-card";
import { db } from "@/db";

export default async function Dashboard() {
    const locations = await db.query.locations.findMany();
    return (
        <main className="p-4 border">
            <div className="grid grid-cols-4">
                <NewCompCard locations={locations} />
            </div>
        </main>
    );
}
