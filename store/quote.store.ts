import { create } from "zustand";

export type Quote = { quote: string; author: string };

interface QuoteState {
    quote: Quote | null;
    refreshCount: number;
    setQuote: (quote: Quote) => void;
    setRefreshCount: (count: number) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
    quote: null,
    setQuote: (quote: Quote) => set({ quote }),
    refreshCount: 0,
    setRefreshCount: (count: number) => set({ refreshCount: count })
}));
