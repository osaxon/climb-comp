"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Location } from "@/db/schema";
import { NewCompSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function NewCompCard({ locations }: { locations: Location[] }) {
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof NewCompSchema>>({
        resolver: zodResolver(NewCompSchema),
        defaultValues: {
            attemptsPerUser: 20,
            locationId: -1,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof NewCompSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast.success("Comp created!", {
            description: <pre>{JSON.stringify(values, null, 2)}</pre>,
        });
        router.push(
            `/comps/new?loc=${values.locationId}&lives=${values.attemptsPerUser}`
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                    <h1 className="text-3xl font-semibold">Start New</h1>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="locationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a location" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {locations.map((location) => (
                                                <SelectItem
                                                    key={location.id}
                                                    value={String(location.id)}
                                                >
                                                    {location.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="attemptsPerUser"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lives per player</FormLabel>
                                    <Input {...field} type="number" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}

const FormFooter = () => <p>footer</p>;
