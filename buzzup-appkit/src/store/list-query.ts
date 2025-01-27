// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  query: "",
  isLoading: false,
  error: null,
  setQuery: (newQuery) => set({ query: newQuery, data: [] }), // Clear data on new query
  setData: (newData) => set({ data: newData }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export default useStore;
