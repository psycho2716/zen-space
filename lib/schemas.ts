import z from "zod";

const passwordLength: number = 6;

export const userSchema = (isSignUp?: boolean) =>
    z
        .object({
            email: z.string({ message: "Email is required." }).email("A valid email is required"),
            password: z
                .string({ message: "Password is required." })
                .min(passwordLength, `Password must be at least ${passwordLength} characters long`),
            confirmPassword: isSignUp
                ? z.string({ message: "Please confirm your password." })
                : z.string().optional()
        })
        .refine((data) => !isSignUp || data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"] // Assigns the error specifically to confirmPassword
        });

export type UserProps = z.infer<ReturnType<typeof userSchema>>;

export const journalSchema = z.object({
    id: z.string().optional(),
    user_id: z.string().optional(),
    title: z.string().min(1, "Title is required.").max(30, "Title is too long"),
    content: z.string().min(1, "Content is required").max(500, "Content is too long"),
    tags: z.string().array().min(1, "Atleast one tag is required."),
    mood: z.string().min(1, "Mood is required."),
    created_at: z.string().optional()
});

export type journalProps = z.infer<typeof journalSchema>;

export const moodSchema = z.object({
    user_id: z.string().optional(),
    mood: z.string().min(1, "Mood is required."),
    notes: z.string().max(500, "Notes are too long").optional(),
    created_at: z.string().optional()
});

export type moodProps = z.infer<typeof moodSchema>;
