import React from "react";
import { useTheme } from "@emotion/react";
import { useErrorBoundary } from "react-error-boundary";

import { TodoListWrapper } from "~/components/todo/TodoListWrapper";
import { Button } from "~/components/ui/Button";
import { Flex } from "~/components/ui/Flex";
import { Typography } from "~/components/ui/Typography";

const TodoError = () => {
  const { resetBoundary } = useErrorBoundary();
  const { spacing } = useTheme();

  return (
    <TodoListWrapper>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        css={{
          height: "100%",
        }}
      >
        <Typography type="todo-empty" css={{ marginBottom: spacing["24px"] }}>
          할 일 목록을 불러오는 중 에러가 발생했습니다.
        </Typography>
        <Button
          type="button"
          color="default"
          variant="solid"
          onPress={resetBoundary}
        >
          다시 시도
        </Button>
      </Flex>
    </TodoListWrapper>
  );
};

export default TodoError;
