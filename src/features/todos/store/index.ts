import { createStore } from "zustand/vanilla";

import type { GetTodoListApiResponse } from "~/features/todos/api/getTodoList";
import type {
  TodoSlice,
  TodoState,
} from "~/features/todos/store/slices/todoSlice";
import { defaultState } from "~/features/todos/store/defaultState";
import { createTodoSlice } from "~/features/todos/store/slices/todoSlice";

export interface DeepPartialTodoState {
  todo?: TodoState["todo"];
}

export type Store = TodoSlice;

export const initStore = (initialState: DeepPartialTodoState): TodoState => {
  return {
    ...defaultState,
    todo: {
      ...defaultState.todo,
      ...initialState.todo,
    },
  };
};

export const createTodoStore = (initState: TodoState = defaultState) => {
  return createStore<Store>()((set, get, store) => ({
    ...createTodoSlice(set, get, store),
    ...initState,
  }));
};

export const transformTodoDataToRecord = (response: GetTodoListApiResponse) => {
  const {
    data: { pageInfo, list, totalCount },
  } = response;

  const record: TodoState["todo"] = {};
  record[pageInfo.currentPage.toString()] = {
    list: list.map(transformTodoRecord),
    totalCount,
    pageInfo,
  };
  return record;
};

export const transformTodoRecord = <T extends Record<string, any>>(
  record: T,
) => {
  return {
    ...record,
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
  };
};
