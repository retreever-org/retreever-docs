import { type DocNode } from './../dashboard/types/docfile.types';
import { create } from "zustand";
import { getMarkdown } from "../dashboard/service/DocSearch";

export interface ViewingDoc {
  markdown: string | null;
  path: string | null;
}

interface DocsState {
  current: ViewingDoc;
  cache: Record<string, string>;                // path -> markdown
  setCurrent: (path: string) => Promise<void>;
}

export const useDocsStore = create<DocsState>((set, get) => ({
  current: {
    markdown: null,
    path: null,
  },
  cache: {},
  setCurrent: async (path: string) => {
    if (!path) path = "introduction";

    const { cache } = get();

    // 1) Cache hit → no network call
    if (cache[path]) {
      set({
        current: {
          markdown: cache[path],
          path,
        },
      });
      return;
    }

    // 2) Cache miss → fetch and store
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
  },
}));

// ------------------------ Doc Tree ---------------------------
type DocTreeState = {
  tree: DocNode[];                  // cached tree
  loaded: boolean;                  // has it been fetched?
  load: () => Promise<void>;        // fetch + cache
  setTree: (tree: DocNode[]) => void;
};

export const useDocTree = create<DocTreeState>((set, get) => ({
  tree: [],
  loaded: false,

  setTree: (tree: DocNode[]) => set({ tree, loaded: true }),

  load: async () => {
    const { loaded } = get();
    if (loaded) return; // already cached for this session

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
