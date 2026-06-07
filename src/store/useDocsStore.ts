import { type DocNode } from "./../dashboard/types/docfile.types";
import { create } from "zustand";
import { DEFAULT_DOC_PATH, getMarkdown } from "../dashboard/service/DocSearch";

export interface ViewingDoc {
  markdown: string | null;
  path: string | null;
}

interface DocsState {
  current: ViewingDoc;
  cache: Record<string, string>;
  setCurrent: (path: string) => Promise<string | null>;
}

export const useDocsStore = create<DocsState>((set, get) => ({
  current: {
    markdown: null,
    path: DEFAULT_DOC_PATH,
  },
  cache: {},
  setCurrent: async (path: string) => {
    if (!path) path = DEFAULT_DOC_PATH;

    const { cache } = get();

    // 1) Cache hit -> no network call
    if (cache[path]) {
      set({
        current: {
          markdown: cache[path],
          path,
        },
      });
      return cache[path];
    }

    set({
      current: {
        markdown: null,
        path,
      },
    });

    // 2) Cache miss -> fetch and store
    const markdown = await getMarkdown(path);

    set((state) => ({
      current: {
        markdown,
        path,
      },
      cache: markdown
        ? { ...state.cache, [path]: markdown }
        : state.cache, // do not cache null/failed
    }));

    return markdown;
  },
}));

// ------------------------ Doc Tree ---------------------------
type DocTreeState = {
  tree: DocNode[];
  loaded: boolean;
  load: () => Promise<void>;
  setTree: (tree: DocNode[]) => void;
};

export const useDocTree = create<DocTreeState>((set, get) => ({
  tree: [],
  loaded: false,

  setTree: (tree: DocNode[]) => set({ tree, loaded: true }),

  load: async () => {
    const { loaded } = get();
    if (loaded) return;

    const res = await fetch("/doc-tree.json");
    if (!res.ok) {
      console.warn("Failed to load doc-tree.json", res.status);
      return;
    }

    const data = (await res.json()) as DocNode[];
    set({ tree: data, loaded: true });
  },
}));

// ---------------------- Other Layout -------------------------

type LayoutState = {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarWidth: 0,
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
}));
