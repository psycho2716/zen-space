"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserProps, userSchema } from "@/lib/schemas";
import { z } from "zod";
import { encodedRedirect } from "@/lib/utils";

export async function signIn(formValues: UserProps) {
    const supabase = await createClient();

    const result = await userSchema().safeParseAsync(formValues);

    if (!result.success) {
        if (result.error instanceof z.ZodError) {
            const errors = result.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                };
            });

            return {
                error: {
                    type: "validation",
                    message: "Please fill all fields.",
                    errors
                }
            };
        }
    }

    const { error } = await supabase.auth.signInWithPassword(formValues);

    if (error) {
        // console.log("Error signing in user in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    encodedRedirect("success", "/", "Signed in successfully!");
}

export async function signUp(formValues: UserProps) {
    const supabase = await createClient();

    const { email, password } = formValues;

    const result = await userSchema(true).safeParseAsync(formValues);

    if (!result.success) {
        if (result.error instanceof z.ZodError) {
            const errors = result.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                };
            });

            return {
                error: {
                    type: "validation",
                    message: "Please fill all fields.",
                    errors
                }
            };
        }
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.log("Error signing up user in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    encodedRedirect(
        "success",
        "/auth/success",
        "Sign up successful! Please check your email for verification."
    );
}

export const oAuthSignInAction = async (provider: Provider) => {
    const origin = (await headers()).get("origin");

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/callback`
        }
    });

    if (error) {
        console.log("Error social sign in or sign up in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    return redirect(data.url);
};

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/");
}
