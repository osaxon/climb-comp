"use client";
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form as FormProvider,
} from "../ui/form";
import { Input } from "../ui/input";
import { AuthCard } from "./auth-card";

export const SignUpForm = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
    };

    return (
        <AuthCard
            headerLabel="Welcome"
            backLabel="Already have an account?"
            backHref="/auth/login"
            showSocialButtons
        >
            <FormProvider {...form}>
                <Form
                    action="/api/auth/signup"
                    onSuccess={() => toast.success("Account created!")}
                    onError={() => toast.error("Something went wrong.")}
                    className="space-y-6"
                    control={form.control}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="something@email.com"
                                            type="text"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder="********"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </Form>
            </FormProvider>
        </AuthCard>
    );
};
