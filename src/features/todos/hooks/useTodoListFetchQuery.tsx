"use client";

import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoListFetchQuery = () => {
  return useStore(useShallow((state) => state.fetch));
};

export const useTodoListRefetchQuery = () => {
  return useStore(useShallow((state) => state.refetch));
};

export const useTodoListRrefetchTodoIdQuery = () => {
  return useStore(useShallow((state) => state.refetchTodoId));
};
