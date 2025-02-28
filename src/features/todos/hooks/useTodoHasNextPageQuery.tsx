"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useStore } from "~/features/todos/store/TodoStoreProvider";

export const useTodoHasNextPageQuery = () => {
  const { hasNextPage, todo } = useStore(
    useShallow((state) => ({
      hasNextPage: state.hasNextPage,
      todo: state.todo,
    })),
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => hasNextPage(), [hasNextPage, todo]);
};
