// Utilities
import { create } from "zustand";

type LoadingState = {
  loading: boolean;
  loadingCount: number,
}

type LoadingAction = {
  setLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingState & LoadingAction>((set, get) => ({
  loading: false,
  loadingCount: 0,
  setLoading: (loading) => set((state) => {
    const value = loading ? 1 : -1;
    const loadingCount = state.loadingCount + value > 0 ? state.loadingCount + value : 0;

    return {
      loadingCount,
      loading: !!loadingCount,
    }
  }),
}))

export default useLoadingStore;