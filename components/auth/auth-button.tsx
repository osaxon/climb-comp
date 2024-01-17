"use client";

import { useRouter } from "next/navigation";

type AuthButtonProps = {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
};

export const AuthButton = ({
    children,
    mode = "redirect",
    asChild = false,
}: AuthButtonProps) => {
    const router = useRouter();
    const onClick = () => router.push("/auth/login");
    return <span onClick={() => onClick()}>{children}</span>;
};
