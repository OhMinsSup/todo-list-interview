import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import { useTodoSearchStore } from "~/features/search/store";
import { createTodoAction } from "~/features/todos/actions/createTodoAction";
import { useTodoListRefetchQuery } from "~/features/todos/hooks/useTodoListFetchQuery";

export const useTodoCreateActionHook = () => {
  const refetch = useTodoListRefetchQuery();

  return useAction(createTodoAction, {
    onSuccess: async (ctx) => {
      try {
        if (ctx.data?.success) {
          const filter = useTodoSearchStore.getState().getFilter();

          await refetch({
            filter,
          });

          toast.success("할 일이 성공적으로 추가되었습니다.");
        } else {
          const error = ctx.data?.error;
          if (error) {
            toast.error(error.message);
          }
        }
      } catch (e) {
        console.error(e);
        toast.error("할 일 목록을 다시 불러오는 중 오류가 발생했습니다.");
      }
    },
    onError: ({ error: { serverError } }) => {
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
