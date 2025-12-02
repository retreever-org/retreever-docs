import { create } from "zustand";

interface DocsState {
  current: string;
  setCurrent: (name: string) => void;
}

export const useDocsStore = create<DocsState>((set) => ({
  current: "",
  setCurrent: (name) => set({ current: name }),
}));

type LayoutState = {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarWidth: 0,
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
}));