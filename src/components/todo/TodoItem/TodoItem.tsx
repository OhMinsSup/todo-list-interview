import React from "react";
import { useTheme } from "@emotion/react";

import type { Todo } from "~/db/schema";
import { TodoDeleteButton } from "~/components/todo/TodoDeleteButton";
import { Flex } from "~/components/ui/Flex";
import { TodoCheckbox } from "../TodoCheckbox";

interface TodoItemProps {
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
