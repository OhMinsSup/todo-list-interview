"use client";

import type { AriaTextFieldProps } from "@react-aria/textfield";
import React, { useCallback, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

import type { InputRef } from "~/components/ui/Input/Input";
import { Input } from "~/components/ui/Input";
import { Typography } from "~/components/ui/Typography";
import { When } from "~/components/ui/When";
import { useTodoCreateActionHook } from "~/features/todos/hooks/useTodoCreateActionHook";

const TodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [err, setErr] = useState<string | undefined>(undefined);

  const { spacing } = useTheme();

  const { executeAsync, isPending } = useTodoCreateActionHook();

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
    async (formData: FormData) => {
      const result = await executeAsync({
        text: formData.get("todo") as string,
        completed: false,
      });

      if (result?.validationErrors) {
        setErr(result.validationErrors.text?._errors?.at(0));
        return;
      }

      if (result?.data?.success) {
        setValue("");
        inputRef.current?.focus();
      }
    },
    [executeAsync],
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
