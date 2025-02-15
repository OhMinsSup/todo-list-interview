"use client";

import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoListClearQuery = () => {
  return useStore(useShallow((state) => state.clear));
};
