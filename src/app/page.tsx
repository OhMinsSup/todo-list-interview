import React from "react";

import TodoUserListPage from "~/components/pages/TodoUserListPage";
import { getTodoListApi } from "~/features/todos/api/getTodoList";
import { transformTodoDataToRecord } from "~/features/todos/store";
import { TodoStoreProvider } from "~/features/todos/store/TodoStoreProvider";

const Page = async () => {
  const initialData = await getTodoListApi();
  return (
    <TodoStoreProvider todo={transformTodoDataToRecord(initialData)}>
      <TodoUserListPage />
    </TodoStoreProvider>
  );
};

export default Page;
