import { create } from "zustand";

export const TodoTab = {
  All: "All",
  TODO: "TODO",
  DONE: "DONE",
} as const;

export type TodoTabValue = keyof typeof TodoTab;

export interface TodoQuery {
  pageNo: number;
  filter: TodoTabValue;
}

export interface TodoSearchState {
  query: TodoQuery;
}

export interface TodoSearchAction {
  updateQuery: (query: Partial<TodoQuery>) => void;
  updatePageNo: (pageNo: number) => void;
  updateFilter: (filter: TodoTabValue) => void;
  getQuery: () => TodoQuery;
  getFilter: () => TodoTabValue;
  getPageNo: () => number;
}

export type TodoSearchSlice = TodoSearchState & TodoSearchAction;

export const useTodoSearchStore = create<TodoSearchSlice>((set, get) => ({
  query: {
    pageNo: 1,
    filter: TodoTab.All,
  },
  updateQuery: (query) => {
    set((state) => ({
      query: {
        ...state.query,
        ...query,
      },
    }));
  },
  updatePageNo: (pageNo) => {
    set((state) => ({
      query: {
        ...state.query,
        pageNo,
      },
    }));
  },
  updateFilter: (filter) => {
    set((state) => ({
      query: {
        ...state.query,
        filter,
      },
    }));
  },
  getQuery: () => get().query,
  getFilter: () => get().query.filter,
  getPageNo: () => get().query.pageNo,
}));
