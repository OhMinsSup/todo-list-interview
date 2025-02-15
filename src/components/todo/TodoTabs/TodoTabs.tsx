"use client";

import React from "react";
import { useTheme } from "@emotion/react";

import type { TodoTabProps } from "~/components/todo/TodoTab";
import { TodoTab } from "~/components/todo/TodoTab";
import { TodoTab as TodoTabConstant } from "~/features/search/store/useTodoSearchStore";

interface Props extends Omit<TodoTabProps, "value" | "text"> {
  isPending: boolean;
}

const TodoTabs = ({ currentValue, onNavigate, isPending }: Props) => {
  const { sizes, spacing } = useTheme();
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: sizes.full,
        paddingBottom: spacing["16px"],
        "& > :not(:last-child)": {
          marginInlineEnd: spacing["16px"],
          marginBlockEnd: 0,
        },
      }}
    >
      {[
        {
          value: TodoTabConstant.All,
          text: "All",
        },
        {
          value: TodoTabConstant.TODO,
          text: "To do",
        },
        {
          value: TodoTabConstant.DONE,
          text: "Done",
        },
      ].map((tab, index) => {
        return (
          <TodoTab
            key={`todo:navigate:tabs:${index}`}
            currentValue={currentValue}
            isPending={isPending}
            onNavigate={onNavigate}
            {...tab}
          />
        );
      })}
    </div>
  );
};

export default TodoTabs;
