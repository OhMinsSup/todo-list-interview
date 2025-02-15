import type { TodoQuery } from "~/features/search/store/useTodoSearchStore";
import { client } from "~/libs/hono";

function paredCompleted(filter: TodoQuery["filter"]) {
  switch (filter) {
    case "TODO":
      return false;
    case "DONE":
      return true;
    case "All":
    default:
      return undefined;
  }
}

const paredTodoQuery = (params?: Partial<TodoQuery>) => {
  const { pageNo = 1, filter = "All" } = params ?? {};

  const completed = paredCompleted(filter);

  const nextQuery: Record<string, string | undefined> = {
    pageNo: pageNo.toString(),
    limit: "10",
    completed: completed ? completed.toString() : undefined,
  };

  return nextQuery;
};

interface GetTodoListParams {
  query?: Partial<TodoQuery>;
}

export const getTodoListApi = async ({ query }: GetTodoListParams = {}) => {
  const response = await client.api.todos.$get({
    query: paredTodoQuery(query),
  });
  return await response.json();
};

export type GetTodoListApiResponse = Awaited<ReturnType<typeof getTodoListApi>>;
