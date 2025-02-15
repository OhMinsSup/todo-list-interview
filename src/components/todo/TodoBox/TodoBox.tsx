"use client";

import React from "react";
import { useTheme } from "@emotion/react";

import { Flex } from "~/components/ui/Flex";

interface Props {
  children: React.ReactNode;
}

const TodoBox = ({ children }: Props) => {
  const { spacing, rounded, palette, shadows } = useTheme();
  return (
    <Flex
      as="section"
      flexDirection="column"
      css={{
        background: palette.backgroundBase,
        boxShadow: shadows.todoBox,
        borderRadius: rounded["16px"],
        padding: spacing["16px"],

        "@media (min-width: 1024px)": {
          padding: spacing["32px"],
        },
      }}
    >
      {children}
    </Flex>
  );
};

export default TodoBox;
