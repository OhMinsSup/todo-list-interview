"use client";

import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import { createContext, useContext, useRef } from "react";
import { useStore as useZustandStore } from "zustand";

import type { DeepPartialTodoState, Store } from "~/features/todos/store";
import { createTodoStore, initStore } from "~/features/todos/store";

export const TodoStoreContext = createContext<StoreApi<Store> | null>(null);

export interface AppStoreProviderProps extends DeepPartialTodoState {
  children: ReactNode;
}

export const TodoStoreProvider = ({
  children,
  ...initialState
}: AppStoreProviderProps) => {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = createTodoStore(initStore(initialState));
  }

  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
  const context = useContext(TodoStoreContext);

  if (!context) {
    throw new Error("useStore must be use within TodoStoreProvider");
  }

  return useZustandStore(context, selector);
};
