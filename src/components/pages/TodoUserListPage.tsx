"use client";

import React, { useCallback, useTransition } from "react";

import type { TodoTabValue } from "~/features/search/store/useTodoSearchStore";
import { TodoBox } from "~/components/todo/TodoBox";
import { TodoForm } from "~/components/todo/TodoForm";
import { TodoList } from "~/components/todo/TodoList";
import { TodoListSkeleton } from "~/components/todo/TodoListSkeleton";
import { TodoTabs } from "~/components/todo/TodoTabs";
import { TodoTemplate } from "~/components/todo/TodoTemplate";
import { TodoTitle } from "~/components/todo/TodoTitle";
import { TodoTotalCount } from "~/components/todo/TodoTotalCount";
import { When } from "~/components/ui/When";
import { useTodoSearchParamsQuery } from "~/features/search/hooks/useTodoSearchParamsQuery";
import { useTodoListClearQuery } from "~/features/todos/hooks/useTodoListClearQuery";
import { useTodoListFetchQuery } from "~/features/todos/hooks/useTodoListFetchQuery";
import { useTodoTotalCountQuery } from "~/features/todos/hooks/useTodoTotalCountQuery";

const TodoUserListPage = () => {
  const [isPending, startTransition] = useTransition();

  const { query } = useTodoSearchParamsQuery();
  const clearTodoList = useTodoListClearQuery();
  const fetchTodoList = useTodoListFetchQuery();
  const { updateFilter } = useTodoSearchParamsQuery();
  const totalCount = useTodoTotalCountQuery();

  const onNavigate = useCallback(
    (nextFilter: TodoTabValue) => {
      startTransition(async () => {
        clearTodoList();
        updateFilter(nextFilter);
        await fetchTodoList({ filter: nextFilter });
      });
    },
    [clearTodoList, fetchTodoList, updateFilter],
  );

  return (
    <TodoTemplate>
      <TodoTitle title="To Do List" />
      <TodoForm />
      <TodoBox>
        <TodoTabs
          isPending={isPending}
          currentValue={query.filter}
          onNavigate={onNavigate}
        />
        <TodoTotalCount isPending={isPending} count={totalCount} />
        <When condition={isPending}>
          <TodoListSkeleton />
        </When>
        <When condition={!isPending}>
          {query.filter === "All" && <TodoList filter="All" />}
          {query.filter === "TODO" && <TodoList filter="TODO" />}
          {query.filter === "DONE" && <TodoList filter="DONE" />}
        </When>
      </TodoBox>
    </TodoTemplate>
  );
};

export default TodoUserListPage;
