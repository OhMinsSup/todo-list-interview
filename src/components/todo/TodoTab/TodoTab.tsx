import React, { useCallback } from "react";
import { useTheme } from "@emotion/react";

import type { TodoTabValue } from "~/features/search/store/useTodoSearchStore";
import { Button } from "~/components/ui/Button";

export interface TodoTabProps {
  currentValue: TodoTabValue;
  value: TodoTabValue;
  text: string;
  isPending: boolean;
  onNavigate: (nextNavigation: TodoTabValue) => void;
}

const TodoTab = ({
  value,
  text,
  currentValue,
  onNavigate,
  isPending,
}: TodoTabProps) => {
  const { opacity } = useTheme();

  const onPress = useCallback(() => {
    onNavigate(value);
  }, [onNavigate, value]);

  const isActive = currentValue === value;

  return (
    <Button
      color={isActive ? "primary" : "default"}
      variant={isActive ? "filled" : "text"}
      css={{
        width: "108px",
        fontaWeight: "600",
        ...(isPending
          ? {
              cursor: "not-allowed",
              opacity: opacity["50"],
            }
          : {}),
      }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};

export default TodoTab;
