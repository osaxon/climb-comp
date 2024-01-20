"use client";
import { FormCard } from "@/components/form-card-wrapper";
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

export function NewCompCard({ locations }: { locations: Location[] }) {
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof NewCompSchema>>({
        resolver: zodResolver(NewCompSchema),
        defaultValues: {
            attemptsPerUser: 20,
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
        <FormCard
            headerLabel="New Comp"
            subHeaderLabel="Start a new bouldering comp"
        >
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
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={String(field.value)}
                                >
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
                    <Button type="submit">Next</Button>
                </form>
            </Form>
        </FormCard>
    );
}

const FormFooter = () => <p>footer</p>;
