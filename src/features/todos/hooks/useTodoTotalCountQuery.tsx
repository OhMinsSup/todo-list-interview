"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoTotalCountQuery = () => {
  const { getTotalCount, todo } = useStore(
    useShallow((state) => ({
      getTotalCount: state.getTotalCount,
      todo: state.todo,
    })),
  );
  return useMemo(() => getTotalCount(), [getTotalCount, todo]);
};
