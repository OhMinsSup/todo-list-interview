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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getTodoList(), [getTodoList, todo]);
};
