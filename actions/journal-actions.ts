"use server";

import { journalProps, journalSchema } from "@/lib/schemas";
import { ActionResponse } from "@/types/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createJournal(formValues: journalProps): Promise<ActionResponse> {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    // Validate Formdata with zod
    const result = await journalSchema.safeParseAsync(formValues);

    if (!result.success) {
        if (result.error instanceof z.ZodError) {
            console.log(result);
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

    const { error } = await supabase
        .from("journal_entries")
        .insert({ ...formValues, tags: formValues.tags.join(","), user_id: user.data.user?.id });

    if (error) {
        console.log("Error updating journal entry in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    revalidatePath("/journals");
    return {
        error: null
    };
}

export async function updateJournal(id: string, formValues: journalProps) {
    const supabase = await createClient();

    // Validate Formdata with zod
    const result = await journalSchema.safeParseAsync(formValues);

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

    const { error } = await supabase
        .from("journal_entries")
        .update({ ...formValues, tags: formValues.tags.join(",") })
        .eq("id", id);

    if (error) {
        console.log("Error updating journal entry in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    return {
        error: null
    };
}

export async function getJournalEntries(limit?: number): Promise<journalProps[]> {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const query = supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user.data.user?.id)
        .order("created_at", { ascending: true });

    if (limit) {
        query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.log("Fetching journal entries error:", error);
        return [];
    }

    return data;
}

export async function getJournalEntry(id: string): Promise<journalProps[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("journal_entries").select("*").eq("id", id);

    if (error) {
        console.log("Fetching journal entry error:", error);
        return [];
    }

    return data;
}

export async function deleteJournalEntry(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);

    if (error) {
        return {
            error: {
                message: error.message
            }
        };
    }

    revalidatePath("/journals");
    return {
        error: null
    };
}
