"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { TodoTabValue } from "~/features/search/store/useTodoSearchStore";
import { TodoItem } from "~/components/todo/TodoItem";
import { TodoItemSkeleton } from "~/components/todo/TodoItemSkeleton";
import { TodoListWrapper } from "~/components/todo/TodoListWrapper";
import { Flex } from "~/components/ui/Flex";
import { Typography } from "~/components/ui/Typography";
import { When } from "~/components/ui/When";
import { useTodoSearchParamsQuery } from "~/features/search/hooks/useTodoSearchParamsQuery";
import { TodoTab } from "~/features/search/store/useTodoSearchStore";
import { useTodoHasNextPageQuery } from "~/features/todos/hooks/useTodoHasNextPageQuery";
import { useTodoListFetchQuery } from "~/features/todos/hooks/useTodoListFetchQuery";
import { useTodoListQuery } from "~/features/todos/hooks/useTodoListQuery";
import { TodoListSkeleton } from "../TodoListSkeleton";

interface Props {
  filter?: TodoTabValue;
}

const TodoList = ({ filter = "All" }: Props) => {
  const todoList = useTodoListQuery();

  const { query } = useTodoSearchParamsQuery();

  const flatList = useMemo(() => todoList.flatMap((t) => t.list), [todoList]);

  const parentRef = useRef<HTMLDivElement>(null);

  const hasNextPage = useTodoHasNextPageQuery();

  const fetchTodoList = useTodoListFetchQuery();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatList.length + 1 : flatList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 96,
    overscan: 2,
  });

  const isReadyRender = flatList.length && !rowVirtualizer.targetWindow;

  useEffect(() => {
    const reversedItems = [...rowVirtualizer.getVirtualItems()].reverse();
    const lastItem = reversedItems.at(0);

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= flatList.length - 1 && hasNextPage) {
      void fetchTodoList({
        filter,
        pageNo: query.pageNo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter,
    query.pageNo,
    hasNextPage,
    fetchTodoList,
    flatList.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);

  if (!flatList.length) {
    return (
      <TodoListWrapper>
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: "100%",
          }}
        >
          <Typography type="todo-empty">
            <When condition={filter === TodoTab.DONE}>
              완료된 일이 없습니다.
            </When>
            <When condition={filter === TodoTab.TODO}>
              진행중인 일이 없습니다.
            </When>
            <When condition={filter === TodoTab.All}>할 일이 없습니다.</When>
          </Typography>
        </Flex>
      </TodoListWrapper>
    );
  }

  return (
    <TodoListWrapper ref={parentRef}>
      <ul
        css={(theme) => ({
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: theme.sizes.full,
          position: "relative",
        })}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > flatList.length - 1;
          const todo = flatList[virtualRow.index];

          return (
            <li
              key={`todo:${virtualRow.index}`}
              css={(theme) => ({
                position: "absolute",
                top: 0,
                left: 0,
                width: theme.sizes.full,
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              })}
            >
              <When condition={isLoaderRow && hasNextPage}>
                <TodoItemSkeleton />
              </When>
              <When condition={!isLoaderRow}>
                <TodoItem item={todo} />
              </When>
            </li>
          );
        })}
        <When condition={isReadyRender}>
          <TodoListSkeleton.List as="li" />
        </When>
      </ul>
    </TodoListWrapper>
  );
};

export default TodoList;
