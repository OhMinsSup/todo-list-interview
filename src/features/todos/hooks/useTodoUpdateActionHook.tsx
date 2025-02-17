import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import { updateTodoAction } from "~/features/todos/actions/updateTodoAction";
import { useTodoListRrefetchTodoIdQuery } from "~/features/todos/hooks/useTodoListFetchQuery";
import { useTodoUpdateCompletedQuery } from "~/features/todos/hooks/useTodoUpdateCompletedQuery";

export const useTodoUpdateActionHook = () => {
  const updateTodoCompleted = useTodoUpdateCompletedQuery();
  const refetchTodoId = useTodoListRrefetchTodoIdQuery();

  return useAction(updateTodoAction, {
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
};
