import { createJournal, deleteJournalEntry, updateJournal } from "@/actions/journal-actions";
import { ErrorsType, StatusProps } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useSupabaseJournal() {
    const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
    const [status, setStatus] = useState<StatusProps | null>(null);
    const [errors, setErrors] = useState<ErrorsType>([]);

    const router = useRouter();

    const handleInsertJournalEntry = async (
        title: string,
        content: string,
        mood: string,
        tags: string[]
    ) => {
        if (!supabaseClient) return;

        setStatus({
            state: "loading",
            message: "Creating journal entry..."
        });

        const formValues = { title, content, tags: tags, mood };

        const { error } = await createJournal(formValues);

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
            message: "Journal entry created successfully!"
        });
    };

    const handleUpdateJournalEntry = async (
        id: string,
        title: string,
        content: string,
        mood: string,
        tags: string[]
    ) => {
        if (!supabaseClient || !id) return;

        setStatus({
            state: "loading",
            message: "Updating journal entry..."
        });

        const formValues = { title, content, tags: tags, mood };

        const { error } = await updateJournal(id, formValues);

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
            message: "Journal entry updated successfully!"
        });

        router.push("/journals");
    };

    const handleDeleteJournalEntry = async (id: string) => {
        if (!supabaseClient || !id) return;

        setStatus({
            state: "loading",
            message: "Deleting journal entry..."
        });

        try {
            // const { error } = await supabaseClient?.from("journal_entries").delete().eq("id", id);
            const { error } = await deleteJournalEntry(id);

            if (error) {
                console.error(error);
                setStatus({
                    state: "error",
                    message: error.message
                });
            }
        } catch {
            console.error("Error deleting journal entry.");
        } finally {
            setStatus({
                state: "idle",
                message: ""
            });
        }
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
        handleInsertJournalEntry,
        handleUpdateJournalEntry,
        handleDeleteJournalEntry
    };
}
