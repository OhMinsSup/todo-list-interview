import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import { deleteTodoAction } from "~/features/todos/actions/deleteTodoAction";
import { useTodoListRrefetchTodoIdQuery } from "~/features/todos/hooks/useTodoListFetchQuery";

export const useTodoDeleteActionHook = () => {
  const refetchTodoId = useTodoListRrefetchTodoIdQuery();

  return useAction(deleteTodoAction, {
    onSuccess: async (ctx) => {
      try {
        await refetchTodoId(ctx.input.id);

        toast.success("할 일이 성공적으로 삭제되었습니다.");
      } catch (e) {
        console.error(e);
        toast.error("할 일 목록을 다시 불러오는 중 오류가 발생했습니다.");
      }
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      if (validationErrors) {
        toast.error("잘못된 입력 값이 있습니다. 입력 값을 확인해 주세요.");
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
