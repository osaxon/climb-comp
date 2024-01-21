import { getLocations } from "@/actions";
import { NewCompCard } from "@/components/new-comp-card";
import StatCard from "@/components/stat-card";

export default async function Dashboard() {
    const locations = await getLocations();

    if (!locations) {
        return <div>No locations</div>;
    }

    return (
        <main className="p-4 border">
            <div className="grid grid-cols-4">
                <NewCompCard locations={locations}/>
                <StatCard title="Stats" />
            </div>
        </main>
    );
}
