"use client";

import React from "react";
import { useTheme } from "@emotion/react";

import { Padding } from "~/components/ui/Padding";

const TodoItemSkeleton = () => {
  const { spacing, rounded, palette } = useTheme();
  return (
    <Padding
      all="32px"
      css={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        gap: spacing["16px"],
      }}
    >
      <div
        css={{
          width: "32px",
          height: "32px",
          borderRadius: rounded.full,
          backgroundColor: palette.grayLight,
        }}
      />
      <span
        css={{
          width: `50%`,
          height: "25px",
          borderRadius: "4px",
          backgroundColor: palette.grayLight,
        }}
      />
      <div
        css={{
          marginLeft: "auto",
          width: "35px",
          height: "25px",
          borderRadius: rounded["4px"],
          backgroundColor: palette.grayLight,
        }}
      />
    </Padding>
  );
};

export default TodoItemSkeleton;
