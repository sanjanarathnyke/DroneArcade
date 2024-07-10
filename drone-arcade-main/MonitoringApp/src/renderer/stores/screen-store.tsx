import { create } from 'zustand';

type ScreenState = {
  loadingScreen: boolean;
  setLoadingScreen: (x: boolean) => void;
};

export const useScreenStore = create<ScreenState>()((set) => ({
  loadingScreen: false,
  setLoadingScreen: (x) => set(() => ({ loadingScreen: x })),
}));
