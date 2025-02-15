import React from "react";
import { useTheme } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const TodoListWrapper = React.forwardRef<HTMLDivElement, Props>(
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
