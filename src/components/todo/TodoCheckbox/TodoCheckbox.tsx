import React, { useCallback } from "react";

import { Checkbox } from "~/components/ui/Checkbox";
import { useTodoUpdateActionHook } from "~/features/todos/hooks/useTodoUpdateActionHook";

export interface TodoCheckboxProps {
  todoId: string;
  completed: boolean | null;
}

const TodoCheckbox = ({ todoId, completed }: TodoCheckboxProps) => {
  const { execute, isPending } = useTodoUpdateActionHook();

  const onToggle = useCallback(
    (completed: boolean) => {
      execute({ id: todoId, completed });
    },
    [execute, todoId],
  );

  return (
    <Checkbox
      isDisabled={isPending}
      isSelected={completed ?? undefined}
      aria-label="할 일 목록 체크박스"
      onChange={onToggle}
    />
  );
};

export default TodoCheckbox;
