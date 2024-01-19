import { auth } from "@/auth/lucia";
import { LoginForm } from "@/components/auth/login-form";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    if (session) {
        redirect("/");
    }
    return (
        <div>
            <LoginForm />
        </div>
    );
}
