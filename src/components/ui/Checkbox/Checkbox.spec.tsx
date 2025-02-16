/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { CheckboxProps, CheckboxRef } from "./Checkbox";
import LayoutEmotion from "~/app/layout.emotion";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  const onChange = jest.fn();

  const setup = (props?: CheckboxProps) => {
    return render(
      <LayoutEmotion>
        <Checkbox
          aria-label="체크박스"
          aria-labelledby="checkbox-title"
          {...props}
        />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    onChange.mockClear();
  });

  it("Checkbox 컴포넌트 렌더링", () => {
    const { getByTestId } = setup();
    const checkbox = getByTestId("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("Checkbox 컴포넌트 렌더링 (checked prop)", () => {
    const { getByTestId } = setup({
      defaultSelected: true,
    });
    const checkbox = getByTestId("checkbox");

    expect(checkbox).toBeChecked();
  });

  it("Checkbox 컴포넌트 렌더링 (onChange prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "checkbox",
      onChange,
    });
    const checkbox = getByTestId("checkbox") as HTMLInputElement;
    const label = getByTestId("checkbox-label");

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBe(true);

    expect(label).toHaveClass("checkbox--checked");
    expect(label.querySelector("svg")).toHaveAttribute("fill", "#ffffff");

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[1][0]).toBe(false);

    expect(label).toHaveClass("checkbox--unchecked");
    expect(label.querySelector("svg")).toHaveAttribute("fill", "none");
  });

  it("Checkbox 컴포넌트 렌더링 (disabled prop)", () => {
    const { getByTestId } = setup({
      isDisabled: true,
    });
    const checkbox = getByTestId("checkbox") as HTMLInputElement;

    expect(checkbox).toBeDisabled();
  });

  it("Checkbox 컴포넌 렌더링 (isSelected prop)", () => {
    const { getByTestId } = setup({
      isSelected: true,
    });
    const checkbox = getByTestId("checkbox") as HTMLInputElement;
    const label = getByTestId("checkbox-label");

    expect(checkbox.checked).toBe(true);
    expect(label).toHaveClass("checkbox--checked");
    expect(label.querySelector("svg")).toHaveAttribute("fill", "#ffffff");
  });

  it("Checkbox 컴포넌트 렌더링 (ref prop)", () => {
    const ref = React.createRef<CheckboxRef>();
    const { getByTestId } = render(
      <LayoutEmotion>
        <Checkbox
          aria-label="체크박스"
          aria-labelledby="checkbox-title"
          ref={ref}
        />
      </LayoutEmotion>,
    );
    const checkbox = getByTestId("checkbox") as HTMLInputElement;
    const label = getByTestId("checkbox-label");

    expect(ref.current).not.toBeNull();
    expect(ref.current?.input).toBe(checkbox);
    expect(ref.current?.label).not.toBeNull();
    expect(ref.current?.label).toBe(label);
    expect(ref.current?.focus).toBeInstanceOf(Function);
    expect(ref.current?.blur).toBeInstanceOf(Function);
  });
});
