import { auth } from "@/auth/auth";

import { AuthButton } from "@/components/auth/auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function Nav() {
    const session = await auth();

    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={""} />
                    <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <span className="text-white">{session?.user?.name}</span>
            </div>
            <AuthButton>
                <Button>Sign Out</Button>
            </AuthButton>
        </div>
    );
}
