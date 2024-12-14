import { oAuthSignInAction, signIn, signOut, signUp } from "@/actions/auth-actions";
import { UserProps } from "@/lib/schemas";
import { ErrorsType, StatusProps } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { Provider, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useSupabaseAuth() {
    const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
    const [status, setStatus] = useState<StatusProps | null>(null);
    const [errors, setErrors] = useState<ErrorsType>([]);

    const handleUserSignUp = async (formValues: UserProps) => {
        if (!supabaseClient) return;

        setStatus({
            state: "loading",
            message: "Signing up user..."
        });

        const result = await signUp(formValues);

        if (result?.error) {
            if (result?.error.type === "validation") {
                setErrors(result?.error.errors);
                setStatus({
                    state: "error",
                    message: result?.error.message
                });
            } else {
                setStatus({
                    state: "error",
                    message: result?.error.message
                });
            }
        } else {
            setStatus({
                state: "success",
                message: "User signed up successfully!"
            });
        }
    };

    const handleUserSignIn = async (formValues: UserProps) => {
        if (!supabaseClient) return;

        setStatus({
            state: "loading",
            message: "Signing in user..."
        });

        const result = await signIn(formValues);

        if (result?.error) {
            if (result?.error.type === "validation") {
                setErrors(result?.error.errors);
                setStatus({
                    state: "error",
                    message: result?.error.message
                });
            } else {
                setStatus({
                    state: "error",
                    message: result?.error.message
                });
            }

            return;
        } else {
            setStatus({
                state: "success",
                message: "User signed in successfully!"
            });
        }

        return;
    };

    const handleUserSignOut = async () => {
        await signOut();
    };

    const handleUserSocialAuth = async (provider: Provider) => {
        setStatus({
            state: "loading",
            message: "Signing up user..."
        });

        const { error } = await oAuthSignInAction(provider);

        if (error) {
            setStatus({
                state: "error",
                message: error.message
            });

            return;
        }
    };

    const initializeSupabase = async () => {
        const supabase = await createClient();

        if (!supabase) {
            console.error("Supabase client not initialized on useSupabaseUser hook.");

            return;
        }

        setSupabaseClient(supabase);
    };

    useEffect(() => {
        initializeSupabase();
    }, []);

    return {
        status,
        errors,
        handleUserSignUp,
        handleUserSignIn,
        handleUserSocialAuth,
        handleUserSignOut
    };
}
