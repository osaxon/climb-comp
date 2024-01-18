"use client";
import { login } from "@/actions";
import { newUserSchema, type NewUser } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { AuthCard } from "./auth-card";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<NewUser>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: NewUser) => {
        startTransition(() => {
            console.log(values);
            login(values);
        });
    };

    return (
        <AuthCard
            headerLabel="Welcome back!"
            backLabel="Don't have an account?"
            backHref="/auth/register"
            showSocialButtons
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="something@email.com"
                                            type="email"
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

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </AuthCard>
    );
};
