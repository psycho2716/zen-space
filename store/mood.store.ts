import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MoodState {
    selectedMood: string | null;
    setSelectedMood: (mood: string) => void;
}

const useMoodStore = create<MoodState>()(
    persist(
        (set) => ({
            selectedMood: null,
            setSelectedMood: (mood: string) => set({ selectedMood: mood })
        }),
        {
            name: "mood-storage" // Key for localStorage
        }
    )
);

export default useMoodStore;
