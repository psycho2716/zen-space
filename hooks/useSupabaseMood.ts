import { createMood } from "@/actions/mood-actions";
import { ErrorsType, StatusProps } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useSupabaseMood() {
    const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
    const [status, setStatus] = useState<StatusProps | null>(null);
    const [errors, setErrors] = useState<ErrorsType>([]);

    const handleInsertMood = async (formValues: { mood: string; notes?: string }) => {
        if (!supabaseClient) return;

        setStatus({ state: "loading", message: "Creating mood entry..." });

        const { error } = await createMood(formValues);

        if (error) {
            if (error.type === "validation") {
                setErrors(error.errors);

                setStatus({
                    state: "error",
                    message: error.message
                });
            }

            setStatus({
                state: "error",
                message: error.message
            });

            return;
        }

        setErrors([]);

        setStatus({
            state: "success",
            message: "Great! Your mood has been set for the day.😊"
        });
    };

    const initializeSupabase = async () => {
        const supabase = await createClient();

        if (!supabase) return;

        setSupabaseClient(supabase);
    };

    useEffect(() => {
        initializeSupabase();
    }, []);

    return {
        status,
        errors,
        handleInsertMood
    };
}
