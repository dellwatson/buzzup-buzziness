// useStore.js
import { create } from "zustand";

export const useScrollStore = create((set) => ({
  opacity: 1,
  setOpacity: (value) => set({ opacity: value }),
}));
