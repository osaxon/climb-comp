"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

type FormCardProps = {
    children: React.ReactNode;
    headerLabel: string;
    subHeaderLabel?: string;
    showFooter?: boolean;
    footerContent?: React.ReactNode;
};

export const FormCard = ({
    children,
    headerLabel,
    subHeaderLabel,
    footerContent,
    showFooter,
}: FormCardProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                    <h1 className="text-3xl font-semibold">{headerLabel}</h1>
                    {subHeaderLabel && (
                        <p className="text-muted-foreground text-sm">
                            {subHeaderLabel}
                        </p>
                    )}
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showFooter && (
                <CardFooter className="border flex justify-end">
                    {footerContent}
                </CardFooter>
            )}
        </Card>
    );
};
