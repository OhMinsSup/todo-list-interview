import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import type { TodoTotalCountProps } from "./TodoTotalCount";
import LayoutEmotion from "~/app/layout.emotion";
import TodoTotalCount from "./TodoTotalCount";

describe("TodoTotalCount", () => {
  const setup = (props: TodoTotalCountProps) => {
    return render(
      <LayoutEmotion>
        <TodoTotalCount {...props} />
      </LayoutEmotion>,
    );
  };

  it("TodoTotalCount 컴포넌트 렌더링", () => {
    const { getByTestId } = setup({
      isPending: false,
      count: 0,
    });
    const todoTotalCount = getByTestId("todo-total-count");

    expect(todoTotalCount).toBeInTheDocument();
    expect(todoTotalCount).toHaveTextContent("총 0개");
  });

  it("TodoTotalCount 컴포넌트 렌더링 (isPending prop)", () => {
    const { getByTestId } = setup({
      isPending: true,
      count: 0,
    });
    const todoTotalCount = getByTestId("todo-total-count");

    expect(todoTotalCount).toBeInTheDocument();
    expect(todoTotalCount).toHaveTextContent("할 일 가져오는 중...");
  });

  it("TodoTotalCount 컴포넌트 렌더링 (count prop)", () => {
    const { getByTestId } = setup({
      isPending: false,
      count: 1,
    });
    const todoTotalCount = getByTestId("todo-total-count");

    expect(todoTotalCount).toBeInTheDocument();
    expect(todoTotalCount).toHaveTextContent("총 1개");
  });

  it("TodoTotalCount 컴포넌트 렌더링 (isPending, count prop)", () => {
    const { getByTestId } = setup({
      isPending: true,
      count: 1,
    });
    const todoTotalCount = getByTestId("todo-total-count");

    expect(todoTotalCount).toBeInTheDocument();
    expect(todoTotalCount).toHaveTextContent("할 일 가져오는 중...");
  });

  it("TodoTotalCount 컴포넌트 렌더링 (count prop)", () => {
    const { getByTestId } = setup({
      isPending: false,
      count: 2,
    });
    const todoTotalCount = getByTestId("todo-total-count");

    expect(todoTotalCount).toBeInTheDocument();
    expect(todoTotalCount).toHaveTextContent("총 2개");
  });
});
