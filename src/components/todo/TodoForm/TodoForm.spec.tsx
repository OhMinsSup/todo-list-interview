import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import LayoutEmotion from "~/app/layout.emotion";
import { useTodoCreateActionHook } from "~/features/todos/hooks/useTodoCreateActionHook";
import TodoForm from "./TodoForm";

jest.mock("~/features/todos/hooks/useTodoCreateActionHook", () => ({
  useTodoCreateActionHook: jest.fn(),
}));

describe("TodoForm", () => {
  beforeEach(() => {
    (useTodoCreateActionHook as jest.Mock).mockReturnValue({
      executeAsync: jest.fn(),
      isPending: false,
    });
  });

  const setup = () => {
    return render(
      <LayoutEmotion>
        <TodoForm />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TodoForm 컴포넌트 렌더링", () => {
    const { container } = setup();

    const form = container.querySelector<HTMLFormElement>("form");
    const input =
      container.querySelector<HTMLInputElement>('input[type="text"]');
    expect(form).toBeTruthy();
    expect(input).toBeTruthy();
    expect(form).toContainElement(input);
  });
});
