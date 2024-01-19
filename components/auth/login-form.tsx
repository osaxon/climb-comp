"use client";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

export const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <AuthCard
            headerLabel="Welcome back!"
            backLabel="Don't have an account?"
            backHref="/auth/signup"
            showSocialButtons
        >
            <FormProvider {...form}>
                <Form
                    action="/api/auth/login"
                    onSuccess={() => router.refresh()}
                    onError={() => toast.error("Something went wrong.")}
                    className="space-y-6"
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
                                            placeholder="your username"
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
                                            placeholder="********"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </Form>
            </FormProvider>
        </AuthCard>
    );
};
