"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User } from "@/db/schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

type UserFollowers = {
    user_id: string;
    followed_by_id: string;
    followed_by_user: User;
};

export default function UserSelection({
    users,
}: {
    users: UserFollowers[] | undefined;
}) {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>Add Players</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {users?.map((user) => (
                        <li
                            className="flex items-center space-x-2"
                            key={user.followed_by_id}
                        >
                            <Checkbox
                                id={`user-${user.followed_by_id}`}
                                checked={selectedUsers.includes(
                                    user.followed_by_id
                                )}
                                onCheckedChange={(e) => {
                                    if (e.valueOf() === true) {
                                        setSelectedUsers([
                                            ...selectedUsers,
                                            user.followed_by_id,
                                        ]);
                                    } else {
                                        setSelectedUsers(
                                            selectedUsers.filter(
                                                (id) =>
                                                    id !== user.followed_by_id
                                            )
                                        );
                                    }
                                }}
                            />
                            <Label
                                className="text-lg"
                                htmlFor={`user-${user.followed_by_id}`}
                            >
                                {user.followed_by_id}
                            </Label>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        router.push(
                            `${pathname}?${createQueryString(
                                "users",
                                selectedUsers.join(",")
                            )}`
                        );
                    }}
                >
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}
