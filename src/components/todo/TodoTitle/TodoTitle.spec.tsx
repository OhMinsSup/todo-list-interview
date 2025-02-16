import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import type { TodoTitleProps } from "./TodoTitle";
import LayoutEmotion from "~/app/layout.emotion";
import TodoTitle from "./TodoTitle";

describe("TodoTitle", () => {
  const setup = (props: TodoTitleProps) => {
    return render(
      <LayoutEmotion>
        <TodoTitle {...props} />
      </LayoutEmotion>,
    );
  };

  it("TodoTitle 컴포넌트 렌더링", () => {
    const { getByTestId } = setup({
      title: "할 일 목록",
    });
    const todoTitle = getByTestId("todo-title");

    expect(todoTitle).toBeInTheDocument();
    expect(todoTitle).toHaveTextContent("할 일 목록");
  });
});
