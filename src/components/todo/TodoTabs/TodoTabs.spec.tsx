import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { TodoTabsProps } from "./TodoTabs";
import LayoutEmotion from "~/app/layout.emotion";
import TodoTabs from "./TodoTabs";

describe("TodoTabs", () => {
  const onNavigate = jest.fn();

  const setup = (props: TodoTabsProps) => {
    return render(
      <LayoutEmotion>
        <TodoTabs {...props} />
      </LayoutEmotion>,
    );
  };

  afterAll(() => {
    onNavigate.mockClear();
  });

  it("TodoTabs 컴포넌트 렌더링", () => {
    const { container } = setup({
      currentValue: "All",
      isPending: false,
      onNavigate: onNavigate,
    });

    expect(container.querySelectorAll("button")).toHaveLength(3);
    for (const tab of ["All", "To do", "Done"]) {
      expect(container).toHaveTextContent(tab);
    }
  });

  it("TodoTabs 컴포넌트 클릭 이벤트", () => {
    const { container } = setup({
      currentValue: "All",
      isPending: false,
      onNavigate,
    });

    fireEvent.click(container.querySelectorAll("button")[1]);

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith("TODO");
    expect(onNavigate).toHaveBeenCalled();
  });

  it("TodoTabs 컴포넌트 (Active=ToDo)", () => {
    const { container } = setup({
      currentValue: "TODO",
      isPending: false,
      onNavigate,
    });

    expect(container.querySelectorAll("button")[1]).toHaveClass(
      "button--primary button--filled",
    );

    fireEvent.click(container.querySelectorAll("button")[1]);

    expect(onNavigate).toHaveBeenCalledTimes(2);
    expect(onNavigate).toHaveBeenCalledWith("TODO");
    expect(onNavigate).toHaveBeenCalled();
  });

  it('TodoTabs 컴포넌트 (Active="Done")', () => {
    const { container } = setup({
      currentValue: "DONE",
      isPending: false,
      onNavigate,
    });

    expect(container.querySelectorAll("button")[2]).toHaveClass(
      "button--primary button--filled",
    );

    fireEvent.click(container.querySelectorAll("button")[2]);

    expect(onNavigate).toHaveBeenCalledTimes(3);
    expect(onNavigate).toHaveBeenCalledWith("DONE");
    expect(onNavigate).toHaveBeenCalled();
  });
});
