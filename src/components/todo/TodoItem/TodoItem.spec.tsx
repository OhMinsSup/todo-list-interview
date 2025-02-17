import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { TodoItemProps } from "./TodoItem";
import LayoutEmotion from "~/app/layout.emotion";
import { useTodoDeleteActionHook } from "~/features/todos/hooks/useTodoDeleteActionHook";
import { useTodoUpdateActionHook } from "~/features/todos/hooks/useTodoUpdateActionHook";
import TodoItem from "./TodoItem";

jest.mock("~/features/todos/hooks/useTodoUpdateActionHook", () => ({
  useTodoUpdateActionHook: jest.fn(),
}));

jest.mock("~/features/todos/hooks/useTodoDeleteActionHook", () => ({
  useTodoDeleteActionHook: jest.fn(),
}));

describe("v", () => {
  beforeEach(() => {
    (useTodoUpdateActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: false,
    });
    (useTodoDeleteActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: false,
    });
  });

  const setup = (props: TodoItemProps) => {
    return render(
      <LayoutEmotion>
        <TodoItem {...props} />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TodoItem 컴포넌트 렌더링", () => {
    const { getByText } = setup({
      item: {
        id: "1",
        completed: false,
        text: "Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    expect(getByText("Todo")).toBeInTheDocument();
  });

  it("TodoItem 체크박스 클릭", () => {
    const { container } = setup({
      item: {
        id: "1",
        completed: false,
        text: "Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
    if (!input) return;

    fireEvent.click(input);

    const { execute } = useTodoUpdateActionHook();

    expect(execute).toHaveBeenCalled();
    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith({ id: "1", completed: true });
  });

  it("TodoItem 삭제 버튼 클릭", () => {
    const { container } = setup({
      item: {
        id: "1",
        completed: false,
        text: "Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;

    fireEvent.click(button);

    const { execute } = useTodoDeleteActionHook();

    expect(execute).toHaveBeenCalled();
    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith({ id: "1" });
  });

  it("TodoItem 컴포넌트 렌더링 (완료된 Todo)", () => {
    const { getByText } = setup({
      item: {
        id: "1",
        completed: true,
        text: "Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    expect(getByText("Todo")).toHaveStyle("color: rgba(0, 0, 0, 0.45)");
  });
});
