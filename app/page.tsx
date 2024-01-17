import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex items-center flex-col justify-center min-h-dvh space-y-8">
            <h1 className="text-6xl font-semibold">🧗Welcome to Climb Comp!</h1>
            <AuthButton>
                <Button>Sign In</Button>
            </AuthButton>
        </main>
    );
}
