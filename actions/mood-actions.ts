"use server";

import { moodSchema } from "@/lib/schemas";
import { isMoodCreatedToday } from "@/lib/utils";
import { ActionResponse } from "@/types/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function hasMoodForToday() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("moods")
        .select("*")
        .eq("user_id", user.data.user?.id);

    if (error) {
        console.log("Fetching mood error:", error);
        return null;
    }

    return data?.some((mood) => isMoodCreatedToday(mood.created_at));
}

export async function getMoodForToday() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("moods")
        .select("*")
        .eq("user_id", user.data.user?.id);

    if (error) {
        console.log("Fetching mood error:", error);
        return null;
    }

    return data?.find((mood) => isMoodCreatedToday(mood.created_at));
}

export async function getMoodTrends() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("moods")
        .select("mood, created_at")
        .eq("user_id", user.data.user?.id)
        .order("created_at", { ascending: true });

    if (error) {
        return [];
    }

    // Process the data for visualization
    const moodCounts = data.reduce((acc: { [key: string]: number }, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1; // Aggregate mood counts
        return acc;
    }, {});

    const dailyTrends = data.reduce(
        (acc: { [date: string]: { [mood: string]: number } }, entry) => {
            const date = new Date(entry.created_at).toISOString().split("T")[0]; // Extract date only
            acc[date] = acc[date] || {};
            acc[date][entry.mood] = (acc[date][entry.mood] || 0) + 1; // Aggregate by date and mood
            return acc;
        },
        {}
    );

    return { moodCounts, dailyTrends };
}

export async function createMood(formValues: {
    mood: string;
    notes?: string;
}): Promise<ActionResponse> {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const result = await moodSchema.safeParseAsync(formValues);

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
        .from("moods")
        .insert({ ...formValues, user_id: user.data.user?.id });

    if (error) {
        console.log("Error creating mood entry in server action:", error);

        return {
            error: {
                type: "server",
                message: error.message
            }
        };
    }

    revalidatePath("/dashboard");

    return {
        error: null
    };
}
