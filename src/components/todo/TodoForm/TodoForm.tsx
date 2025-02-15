"use client";

import type { AriaTextFieldProps } from "@react-aria/textfield";
import React, { useCallback, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import type { InputRef } from "~/components/ui/Input/Input";
import { Input } from "~/components/ui/Input";
import { Typography } from "~/components/ui/Typography";
import { When } from "~/components/ui/When";
import { useTodoSearchStore } from "~/features/search/store";
import { createTodoAction } from "~/features/todos/actions/createTodoAction";
import { useTodoListRefetchQuery } from "~/features/todos/hooks/useTodoListFetchQuery";

const TodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");
  const refetch = useTodoListRefetchQuery();
  const inputRef = useRef<InputRef>(null);
  const [err, setErr] = useState<string | undefined>(undefined);

  const { spacing } = useTheme();

  const { execute, isPending } = useAction(createTodoAction, {
    onSuccess: async () => {
      try {
        const filter = useTodoSearchStore.getState().getFilter();

        await refetch({
          filter,
        });

        toast.success("할 일이 성공적으로 추가되었습니다.");
      } catch (error) {
        console.error(error);
        toast.error("할 일 목록을 다시 불러오는 중 오류가 발생했습니다.");
      } finally {
        setValue("");
        inputRef.current?.focus();
      }
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      if (validationErrors) {
        setErr(validationErrors.text?._errors?.at(0));
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

  const onChange = useCallback((nextValue: string) => {
    setValue(nextValue);
    setErr(undefined);
  }, []);

  const onPressEnter: AriaTextFieldProps["onKeyDown"] = useCallback(() => {
    if (formRef.current) {
      const submitEvent = new Event("submit");
      formRef.current.dispatchEvent(submitEvent);
    }
  }, []);

  const onClear = useCallback(() => {
    setValue("");
    setErr(undefined);
  }, []);

  const submitAction = useCallback(
    (formData: FormData) => {
      execute({
        text: formData.get("todo") as string,
        completed: false,
      });
    },
    [execute],
  );

  return (
    <form
      ref={formRef}
      id="todo-form"
      aria-disabled={isPending}
      action={submitAction}
      css={{
        margin: `${spacing["42px"]} 0`,
      }}
    >
      <Input
        ref={inputRef}
        type="text"
        name="todo"
        autoFocus
        autoComplete="off"
        aria-label="할 일을 입력하는 입력창"
        aria-labelledby="todo-title"
        aria-errormessage={err ? "todo-text-error" : undefined}
        placeholder="할 일을 입력해 주세요."
        allowClear
        isRequired
        value={value}
        isDisabled={isPending}
        onChange={onChange}
        onPressEnter={onPressEnter}
        onClear={onClear}
      />

      <When condition={err}>
        <Typography type="form-input-error" id="todo-text-error">
          {err}
        </Typography>
      </When>
    </form>
  );
};

export default TodoForm;
