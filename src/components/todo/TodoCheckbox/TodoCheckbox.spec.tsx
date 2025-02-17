import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { TodoCheckboxProps } from "./TodoCheckbox";
import LayoutEmotion from "~/app/layout.emotion";
import { useTodoUpdateActionHook } from "~/features/todos/hooks/useTodoUpdateActionHook";
import TodoCheckbox from "./TodoCheckbox";

jest.mock("~/features/todos/hooks/useTodoUpdateActionHook", () => ({
  useTodoUpdateActionHook: jest.fn(),
}));

describe("TodoCheckbox", () => {
  beforeEach(() => {
    (useTodoUpdateActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: false,
    });
  });

  const setup = (props: TodoCheckboxProps) => {
    return render(
      <LayoutEmotion>
        <TodoCheckbox {...props} />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TodoCheckbox 컴포넌트 렌더링", () => {
    const { container } = setup({
      todoId: "1",
      completed: false,
    });

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
    if (!input) return;

    expect(input).not.toBeChecked();
  });

  it("TodoCheckbox 컴포넌트 렌더링 (체크됨)", () => {
    const { container } = setup({
      todoId: "1",
      completed: true,
    });

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
    if (!input) return;

    expect(input).toBeChecked();
  });

  it("TodoCheckbox 컴포넌트 렌더링 (로딩 중)", () => {
    (useTodoUpdateActionHook as jest.Mock).mockReturnValue({
      execute: jest.fn(),
      isPending: true,
    });

    const { container } = setup({
      todoId: "1",
      completed: false,
    });

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
    if (!input) return;

    expect(input).toBeDisabled();
  });

  it("TodoCheckbox 컴포넌트 클릭", () => {
    const { container } = setup({
      todoId: "1",
      completed: false,
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

  it("TodoCheckbox 컴포넌트 클릭 (체크 해제)", () => {
    const { container } = setup({
      todoId: "1",
      completed: true,
    });

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
    if (!input) return;

    fireEvent.click(input);

    const { execute } = useTodoUpdateActionHook();

    expect(execute).toHaveBeenCalled();
    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith({ id: "1", completed: false });
  });
});
