import type { TodoState } from "~/features/todos/store/slices/todoSlice";
import { initialTodoState } from "~/features/todos/store/slices/todoSlice";

export type StoreState = TodoState;

export const defaultState: TodoState = {
  ...initialTodoState,
};
