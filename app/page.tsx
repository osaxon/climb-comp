import { getPageSession } from "@/auth/lucia";
import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getPageSession();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="flex items-center flex-col justify-center min-h-dvh space-y-8">
            <h1 className="text-6xl font-semibold">🧗Welcome to Climb Comp!</h1>
            {!session ? (
                <AuthButton>
                    <Button>Sign In</Button>
                </AuthButton>
            ) : (
                <>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                    <form method="POST" action="/api/auth/logout">
                        <Button type="submit" value="sign out">
                            Sign Out
                        </Button>
                    </form>
                </>
            )}
        </main>
    );
}
