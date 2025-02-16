"use client";

import React from "react";

import { Flex } from "~/components/ui/Flex";
import { Typography } from "~/components/ui/Typography";

export interface TodoTitleProps {
  title: string;
}

const TodoTitle = ({ title }: TodoTitleProps) => {
  return (
    <Flex flexDirection="column" css={{ textAlign: "center" }}>
      <Typography type="title" id="todo-title" data-testid="todo-title">
        {title}
      </Typography>
    </Flex>
  );
};

export default TodoTitle;
