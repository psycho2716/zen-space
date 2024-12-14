declare interface StatusProps {
    state: "idle" | "loading" | "success" | "error";
    message: string | null;
}

declare interface ErrorsProps {
    field: string | number;
    message: string;
}

export type ActionResponse = {
    error: {
        type: "server" | "validation";
        message: string;
        errors?: { field: string | number; message: string }[] | undefined | null;
    } | null;
};

export type ErrorsType = ErrorsProps[] | undefined | null;

export type TrendProps = {
    moodCounts: { [key: string]: number };
    dailyTrends: { [date: string]: { [mood: string]: number } };
} | null;
