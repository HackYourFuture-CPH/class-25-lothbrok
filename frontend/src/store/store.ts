import { create } from "zustand";

interface StateGeneration {
  title: string;
  setTitle: (title: string) => void;
}

export const useGenerationStore = create<StateGeneration>()((set) => ({
  title: "testing",
  setTitle: (title: string) => set({ title }),
}));
