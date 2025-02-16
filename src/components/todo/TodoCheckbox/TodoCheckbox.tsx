import React, { useCallback } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import { Checkbox } from "~/components/ui/Checkbox";
import { updateTodoAction } from "~/features/todos/actions/updateTodoAction";
import { useTodoListRrefetchTodoIdQuery } from "~/features/todos/hooks/useTodoListFetchQuery";
import { useTodoUpdateCompletedQuery } from "~/features/todos/hooks/useTodoUpdateCompletedQuery";

interface TodoCheckboxProps {
  todoId: string;
  completed: boolean | null;
}

const TodoCheckbox = ({ todoId, completed }: TodoCheckboxProps) => {
  const updateTodoCompleted = useTodoUpdateCompletedQuery();
  const refetchTodoId = useTodoListRrefetchTodoIdQuery();

  const { execute, isPending } = useAction(updateTodoAction, {
    onSuccess: async (ctx) => {
      let refetch = false;
      try {
        updateTodoCompleted(ctx.input.id, ctx.input.completed ?? false);
      } catch (e) {
        refetch = true;
        console.error(e);
      }

      if (refetch) {
        try {
          await refetchTodoId(ctx.input.id);
        } catch (e) {
          console.error(e);
          toast.error("할 일 목록을 다시 불러오는 중 오류가 발생했습니다.");
        }
      }
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      if (validationErrors) {
        const errorStr = validationErrors._errors?.at(0);
        toast.error(errorStr);
        return;
      }

      if (serverError) {
        const errorStr = serverError
          ? serverError
          : "서버 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.";
        toast.error(errorStr);
        return;
      }
    },
  });

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
