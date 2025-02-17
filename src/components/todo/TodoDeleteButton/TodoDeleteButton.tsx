import React, { useCallback } from "react";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/Button";
import { useTodoDeleteActionHook } from "~/features/todos/hooks/useTodoDeleteActionHook";

export interface TodoDeleteButtonProps {
  todoId: string;
}

const TodoDeleteButton = ({ todoId }: TodoDeleteButtonProps) => {
  const { execute, isPending } = useTodoDeleteActionHook();

  const onTodoRemove = useCallback(() => {
    execute({ id: todoId });
  }, [execute, todoId]);

  return (
    <div css={{ marginLeft: "auto" }}>
      <Button
        type="button"
        color="default"
        isDisabled={isPending}
        variant="ghost"
        edge="circle"
        onPress={onTodoRemove}
      >
        <Icons.Close fill="gray" />
      </Button>
    </div>
  );
};

export default TodoDeleteButton;
