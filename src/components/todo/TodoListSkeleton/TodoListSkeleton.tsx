import type { ElementType } from "react";
import React from "react";
import { useTheme } from "@emotion/react";

import { TodoItemSkeleton } from "~/components/todo/TodoItemSkeleton";
import { TodoListWrapper } from "~/components/todo/TodoListWrapper";

function TodoListSkeleton() {
  const { sizes } = useTheme();
  return (
    <TodoListWrapper>
      <ul
        css={{
          width: sizes.full,
          position: "relative",
        }}
      >
        <TodoListSkeleton.List />
      </ul>
    </TodoListWrapper>
  );
}

interface TodoListSkeletonListProps<E extends ElementType> {
  count?: number;
  as?: E;
}

TodoListSkeleton.List = function <E extends ElementType>({
  count = 3,
  as,
}: TodoListSkeletonListProps<E>) {
  const Element = as ?? React.Fragment;
  return (
    <Element>
      {[...(Array(count) as number[])].map((_, index) => (
        <TodoItemSkeleton key={`skeleton:todo:${index}`} />
      ))}
    </Element>
  );
};

export default TodoListSkeleton;
