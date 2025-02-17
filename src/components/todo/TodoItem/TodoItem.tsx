import React from "react";
import { useTheme } from "@emotion/react";

import type { Todo } from "~/db/schema";
import { TodoCheckbox } from "~/components/todo/TodoCheckbox";
import { TodoDeleteButton } from "~/components/todo/TodoDeleteButton";
import { Flex } from "~/components/ui/Flex";

export interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const { spacing } = useTheme();

  return (
    <Flex
      position="relative"
      alignItems="center"
      css={{
        gap: spacing["16px"],
        padding: `${spacing["32px"]} ${spacing["16px"]}`,
      }}
    >
      <TodoCheckbox todoId={item.id} completed={item.completed} />
      <span>{item.text}</span>
      <TodoDeleteButton todoId={item.id} />
    </Flex>
  );
};

export default TodoItem;
