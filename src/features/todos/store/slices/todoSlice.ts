import type { StateCreator } from "zustand";

import type { Todo } from "~/db/schema";
import type { TodoQuery } from "~/features/search/store/useTodoSearchStore";
import type { Store } from "~/features/todos/store";
import { useTodoSearchStore } from "~/features/search/store/useTodoSearchStore";
import { getTodoListApi } from "~/features/todos/api/getTodoList";
import { transformTodoRecord } from "~/features/todos/store";

interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

interface TodoValue {
  totalCount: number;
  list: Todo[];
  pageInfo: PaginationInfo;
}

export interface TodoState {
  todo: Record<string, TodoValue>;
}

export interface TodoAction {
  fetch: (query?: Partial<TodoQuery>) => Promise<TodoValue[]>;
  refetch: (query?: Partial<TodoQuery>) => Promise<TodoValue[]>;
  refetchTodoId: (todoId: string) => Promise<TodoValue[]>;
  updateTodoCompleted: (todoId: string, completed: boolean) => TodoValue[];
  clear: () => void;
  hasNextPage: () => boolean;
  hasPageData: (pageNo?: number) => boolean;
  getTodoList: () => TodoValue[];
  getTotalCount: () => number;
  getRealCount: () => number;
}

export type TodoSlice = TodoState & TodoAction;

const LIMIT = 10;

const __SIMPLE_FETCH_PAGE_MUTEX__ = new Map<string, boolean>();

export const initialTodoState: TodoState = {
  todo: {},
};

export const createTodoSlice: StateCreator<Store, [], [], TodoSlice> = (
  set,
  get,
) => ({
  ...initialTodoState,
  refetch: async (query) => {
    const totalCount = get().getTotalCount();
    const realTotalCount = get().getRealCount();

    // 현재 메모리에 있는 List의 갯수와 totalCount의 차이가 있는지 확인
    const isDifferent = realTotalCount !== totalCount;

    if (isDifferent) {
      // 차이가 있다면 데이터 패칭으로 다시 값을 가져옴
      const databasePages = Math.ceil(totalCount / LIMIT);
      // refetchPages의 순서대로 데이터를 가져옴
      for (let i = 1; i <= databasePages; i++) {
        await get().fetch({ pageNo: i });
      }
    } else {
      await get().fetch(query);
    }

    return get().getTodoList();
  },
  refetchTodoId: async (todoId) => {
    const target = get()
      .getTodoList()
      .find((t) => t.list.some((todo) => todo.id === todoId));

    if (!target) {
      return [];
    }

    const currentPageNo = target.pageInfo.currentPage;
    const lastPageNo = Object.keys(get().todo).length;
    for (let i = currentPageNo; i <= lastPageNo; i++) {
      await get().fetch({ pageNo: i });
    }

    return get().getTodoList();
  },
  fetch: async (query?: Partial<TodoQuery>) => {
    const mutexPageId = query?.pageNo?.toString() ?? "1";

    if (__SIMPLE_FETCH_PAGE_MUTEX__.get(mutexPageId)) {
      return get().getTodoList();
    }

    try {
      __SIMPLE_FETCH_PAGE_MUTEX__.set(mutexPageId, true);

      const {
        data: { pageInfo, list, totalCount },
      } = await getTodoListApi({
        query,
      });

      set((state) => ({
        ...state,
        todo: {
          ...state.todo,
          [pageInfo.currentPage.toString()]: {
            totalCount,
            list: list.map(transformTodoRecord),
            pageInfo,
          },
        },
      }));

      if (pageInfo.hasNextPage && pageInfo.nextPage) {
        useTodoSearchStore.getState().updatePageNo(pageInfo.nextPage);
      }
    } finally {
      __SIMPLE_FETCH_PAGE_MUTEX__.delete(mutexPageId);
    }

    return get().getTodoList();
  },
  clear: () => {
    set({
      todo: {},
    });
  },
  getTotalCount: () => {
    return get().getTodoList().at(-1)?.totalCount ?? 0;
  },
  getRealCount: () => {
    return get()
      .getTodoList()
      .reduce((acc, cur) => acc + cur.list.length, 0);
  },
  getTodoList: () => {
    const sortiedTodo = Object.entries(get().todo).sort(([a], [b]) => +a - +b); // 오름차순 정렬
    return sortiedTodo.map(([_, value]) => value);
  },
  hasNextPage: () => {
    return get().getTodoList().at(-1)?.pageInfo.hasNextPage ?? false;
  },
  hasPageData: (pageNo?: number) => {
    const original = get().todo;
    if (pageNo) {
      const record = original[pageNo.toString()] as TodoValue | undefined;
      if (!record) return false;
      return !record.totalCount && !record.list.length;
    }
    return false;
  },
  updateTodoCompleted: (todoId, completed) => {
    const todoList = get().getTodoList();
    const target = todoList.find((t) =>
      t.list.some((todo) => todo.id === todoId),
    );

    if (!target) {
      return todoList;
    }

    const updatedList = target.list.map((todo) =>
      todo.id === todoId ? { ...todo, completed } : todo,
    );

    set((state) => ({
      ...state,
      todo: {
        [target.pageInfo.currentPage]: {
          ...target,
          list: updatedList,
        },
      },
    }));

    return get().getTodoList();
  },
});
