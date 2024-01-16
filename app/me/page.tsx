import { auth, signOut } from "@/auth/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import SignoutButton from "./sign-out-button";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/me");
    }

    return (
        <>
            {session.user.id}
            {session.user.name}
            {session.user.email}
            <Image width={80} height={80} alt="" src={session.user.image!} />

            <SignoutButton
                signOut={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                }}
            />
        </>
    );
}
