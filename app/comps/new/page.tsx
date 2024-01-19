import { NewCompForm } from "./NewCompForm";
import { db } from "@/db";

export default async function NewCompPage() {
    const locations = await db.query.locations.findMany();
    return <NewCompForm locations={locations}/>;
}
