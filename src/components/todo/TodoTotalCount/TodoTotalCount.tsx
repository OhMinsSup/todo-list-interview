"use client";

import React from "react";

import { Padding } from "~/components/ui/Padding";
import { Typography } from "~/components/ui/Typography";
import { When } from "~/components/ui/When";

interface Props {
  isPending: boolean;
  count: number;
}

const TodoTotalCount = ({ isPending, count = 0 }: Props) => {
  return (
    <Padding all="16px">
      <Typography type="count" data-testid="todo-total-count">
        <When condition={isPending}>할 일 가져오는 중...</When>
        <When condition={!isPending}>총 {count}개</When>
      </Typography>
    </Padding>
  );
};

export default TodoTotalCount;
