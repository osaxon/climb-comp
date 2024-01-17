"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AuthCardHeader } from "./auth-card-header";
import { AuthSocialButtons } from "./auth-social-buttons";

type AuthCardProps = {
    children: React.ReactNode;
    headerLabel: string;
    backLabel: string;
    backHref: string;
    showSocialButtons?: boolean;
};

export const AuthCard = ({
    children,
    headerLabel,
    backLabel,
    backHref,
    showSocialButtons,
}: AuthCardProps) => {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <AuthCardHeader label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocialButtons && (
                <CardFooter>
                    <AuthSocialButtons />
                </CardFooter>
            )}
            <CardFooter>
                <Button
                    variant="link"
                    className="font-normal w-full"
                    size="sm"
                    asChild
                >
                    <Link href={backHref}>{backLabel}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
