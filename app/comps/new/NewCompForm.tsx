"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertCompSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

export function NewCompForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof insertCompSchema>>({
        resolver: zodResolver(insertCompSchema),
        defaultValues: {
            status: "in progress",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof insertCompSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast.success("Comp created!", {
            description: <pre>{JSON.stringify(values, null, 2)}</pre>,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
