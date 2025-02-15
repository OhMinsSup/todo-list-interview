"use client";

import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoUpdateCompletedQuery = () => {
  return useStore(useShallow((state) => state.updateTodoCompleted));
};
