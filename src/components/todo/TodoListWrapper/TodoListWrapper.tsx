import React from "react";
import { useTheme } from "@emotion/react";

interface TodoListWrapperProps {
  children: React.ReactNode;
}

const TodoListWrapper = React.forwardRef<HTMLDivElement, TodoListWrapperProps>(
  ({ children }, ref) => {
    const { sizes } = useTheme();
    return (
      <div
        ref={ref}
        css={{
          height: "300px",
          width: sizes.full,
          overflowY: "auto",
          listStyle: "none",
        }}
      >
        {children}
      </div>
    );
  },
);

export default TodoListWrapper;
