import { z } from "zod";
import { compParticipantsSchema } from "@/db/schema";
export const LoginSchema = z.object({
    username: z.string(),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const SignUpSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const NewCompSchema = z.object({
    locationId: z.coerce
        .number()
        .nonnegative({ message: "Location is required" }),
    attemptsPerUser: z.coerce.number().default(20),
});
