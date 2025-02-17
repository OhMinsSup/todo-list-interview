import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { TodoDeleteButtonProps } from "./TodoDeleteButton";
import LayoutEmotion from "~/app/layout.emotion";
import { useTodoDeleteActionHook } from "~/features/todos/hooks/useTodoDeleteActionHook";
import TodoDeleteButton from "./TodoDeleteButton";

jest.mock("~/features/todos/hooks/useTodoDeleteActionHook", () => ({
  useTodoDeleteActionHook: jest.fn(),
}));

describe("TodoDeleteButton", () => {
  beforeEach(() => {
    (useTodoDeleteActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: false,
    });
  });

  const setup = (props: TodoDeleteButtonProps) => {
    return render(
      <LayoutEmotion>
        <TodoDeleteButton {...props} />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TodoDeleteButton 컴포넌트 렌더링", () => {
    const { container } = setup({
      todoId: "1",
    });

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;

    expect(button.querySelector("svg")).toBeTruthy();
  });

  it("TodoDeleteButton 클릭", () => {
    const { container } = setup({
      todoId: "1",
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

  it("TodoDeleteButton 클릭 (로딩 중)", () => {
    (useTodoDeleteActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: true,
    });

    const { container } = setup({
      todoId: "1",
    });

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;

    fireEvent.click(button);

    const { execute } = useTodoDeleteActionHook();

    expect(execute).not.toHaveBeenCalled();
  });
});
