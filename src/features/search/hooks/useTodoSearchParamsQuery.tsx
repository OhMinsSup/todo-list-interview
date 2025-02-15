"use client";

import { useShallow } from "zustand/shallow";

import { useTodoSearchStore } from "~/features/search/store/useTodoSearchStore";

export const useTodoSearchParamsQuery = () => {
  return useTodoSearchStore(useShallow((state) => state));
};
