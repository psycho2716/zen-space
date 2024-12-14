import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a string or an array of strings representing tags into a flat array of tags.
 * Splits each string of tags by commas.
 *
 * @param {string | string[]} tags - A single tag string or an array of tag strings.
 * @returns {string[]} An array of individual tags.
 */
export function convertTagsToArray(tags: string | string[]) {
    if (typeof tags === "string") {
        return tags.split(",");
    } else {
        return tags.flatMap((tag: string) => tag.split(","));
    }
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export const encodedRedirect = (type: "error" | "success", path: string, message: string) => {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
};

/**
 * Checks if the given createdAt date string is today.
 * @param createdAt - The createdAt date string from Supabase.
 * @returns {boolean} True if the createdAt date is today, false otherwise.
 */
export const isMoodCreatedToday = (createdAt: string): boolean => {
    if (!createdAt) return false;

    const today = new Date().toISOString().split("T")[0];
    const moodDate = createdAt.split("T")[0];

    return moodDate === today;
};

/**
 * Capitalizes the first letter of the given string.
 * @param {string} str - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a timestamp to a relative time format (e.g., "A year ago", "2 days ago").
 * @param createdAt - The timestamp to convert.
 * @returns A string representing the time since the given timestamp.
 */
export function formatRelativeTime(createdAt: string | Date): string {
    // Ensure the input is a Date object
    const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

    // Use date-fns to calculate the distance to now and format it
    return formatDistanceToNow(date, { addSuffix: true });
}
