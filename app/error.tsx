"use client"; // Error components must be Client Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbFaceIdError } from "react-icons/tb";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2>Oops!</h2>
                        <p>Something went wrong!</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto">
                    <TbFaceIdError className="w-24 h-24" />

                    <Button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
