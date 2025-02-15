"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoListQuery = () => {
  const { getTodoList, todo } = useStore(
    useShallow((state) => ({
      getTodoList: state.getTodoList,
      todo: state.todo,
    })),
  );
  return useMemo(() => getTodoList(), [getTodoList, todo]);
};
