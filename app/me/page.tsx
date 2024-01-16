import { auth, signOut } from "@/auth/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/db";
import SignoutButton from "./sign-out-button";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/me");
    }

    const data = await db.query.comps.findMany({
        with: { participants: { with: { user: true } } },
    });

    return (
        <>
            <Image width={80} height={80} alt="" src={session.user.image!} />

            <SignoutButton
                signOut={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                }}
            />
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    );
}
