import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { TodoTabProps } from "./TodoTab";
import LayoutEmotion from "~/app/layout.emotion";
import TodoTab from "./TodoTab";

describe("TodoTab", () => {
  const setup = (props: TodoTabProps) => {
    return render(
      <LayoutEmotion>
        <TodoTab {...props} />
      </LayoutEmotion>,
    );
  };

  it("TodoTab 컴포넌트 렌더링", () => {
    const onNavigate = jest.fn();
    const { getByTestId } = setup({
      currentValue: "TODO",
      value: "DONE",
      isPending: false,
      onNavigate,
      text: "Done",
    });
    const todoTab = getByTestId("todo-tab");

    fireEvent.click(todoTab);

    expect(todoTab).toBeInTheDocument();
    expect(todoTab).toHaveTextContent("Done");
    expect(todoTab).toHaveClass("button--default button--text");
    expect(onNavigate).toHaveBeenCalled();
  });

  it("TodoTab 컴포넌트 렌더링 (active)", () => {
    const onNavigate = jest.fn();
    const { getByTestId } = setup({
      currentValue: "All",
      value: "All",
      isPending: false,
      onNavigate,
      text: "All",
    });
    const todoTab = getByTestId("todo-tab");

    fireEvent.click(todoTab);

    expect(todoTab).toBeInTheDocument();
    expect(todoTab).toHaveTextContent("All");
    expect(todoTab).toHaveClass("button--primary button--filled");
    expect(onNavigate).toHaveBeenCalled();
  });
});
