import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  //   //
  user: null,
  setUser: (userData) => set({ user: userData }),
}));

export default useAuthStore;
