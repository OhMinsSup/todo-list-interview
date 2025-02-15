"use client";

import React from "react";

import { Flex } from "~/components/ui/Flex";
import { Typography } from "~/components/ui/Typography";

interface Props {
  title: string;
}

const TodoTitle = ({ title }: Props) => {
  return (
    <Flex flexDirection="column" css={{ textAlign: "center" }}>
      <Typography type="title" id="todo-title" data-testid="todo-title">
        {title}
      </Typography>
    </Flex>
  );
};

export default TodoTitle;
