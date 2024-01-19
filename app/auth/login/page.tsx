import { getPageSession } from "@/auth/lucia";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getPageSession();

    if (session) {
        redirect("/");
    }

    return (
        <div>
            <LoginForm />
        </div>
    );
}
