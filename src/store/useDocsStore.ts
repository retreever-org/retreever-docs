import { create } from "zustand";
import { getMarkdown } from "../dashboard/service/DocSearch";
import { markdownFiles } from "../dashboard/service/DocsResolver";

export interface ViewingDoc {
  markdown: string | null;
  path: string | null;
}

interface DocsState {
  current: ViewingDoc;
  setCurrent: (path: string) => void;
}

export const useDocsStore = create<DocsState>((set) => ({
  current: {
    markdown: null,
    path: null,
  },
  setCurrent: (path: string) => {
    const markdown = getMarkdown(path, markdownFiles) || null;
    set({
      current: {
        markdown,
        path,
      },
    });
  },
}));

type LayoutState = {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarWidth: 0,
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
}));
