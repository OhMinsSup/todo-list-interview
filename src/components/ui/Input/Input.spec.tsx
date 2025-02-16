/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "@testing-library/jest-dom";

import React from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { InputProps, InputRef } from "./Input";
import LayoutEmotion from "~/app/layout.emotion";
import Input from "./Input";

describe("Input", () => {
  const setup = (props: InputProps) => {
    return render(
      <LayoutEmotion>
        <Input
          aria-label="할 일을 입력하는 입력창"
          aria-labelledby="todo-title"
          {...props}
        />
      </LayoutEmotion>,
    );
  };

  it("Input 컴포넌트 렌더링", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
    });
    const input = getByTestId("input");

    expect(input).toBeInTheDocument();
  });

  it("Input 컴포넌트 렌더링 (value prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      value: "Hello, Input!",
    });
    const input = getByTestId("input");

    expect(input).toHaveValue("Hello, Input!");
  });

  it("Input 컴포넌트 렌더링 (onChange prop)", () => {
    const onChange = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onChange,
    });
    const input = getByTestId("input");

    fireEvent.change(input, { target: { value: "Hello, Input!" } });

    expect(input).toHaveValue("Hello, Input!");
    expect(onChange.mock.calls.length).toBe(1);
  });

  it("Input 컴포넌트 렌더링 (onPressEnter prop)", () => {
    const onPressEnter = jest.fn();
    const onKeyDown = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onPressEnter,
      onKeyDown,
    });
    const input = getByTestId("input");

    fireEvent.keyDown(input, { key: "Enter", code: 13 });

    expect(onPressEnter.mock.calls.length).toBe(1);
    expect(onKeyDown.mock.lastCall?.[0].key).toBe("Enter");
    expect(onKeyDown.mock.lastCall?.[0].code).toBe("13");

    expect(onKeyDown.mock.calls.length).toBe(1);
    expect(onKeyDown.mock.lastCall?.[0].key).toBe("Enter");
    expect(onKeyDown.mock.lastCall?.[0].code).toBe("13");
  });

  it("Input 컴포넌트 렌더링 (onKeyDown prop)", () => {
    const onKeyDown = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onKeyDown,
    });
    const input = getByTestId("input");

    fireEvent.keyDown(input, { key: "A", code: 65 });

    expect(onKeyDown.mock.calls.length).toBe(1);
    expect(onKeyDown.mock.lastCall?.[0].key).toBe("A");
    expect(onKeyDown.mock.lastCall?.[0].code).toBe("65");
  });

  it("Input 컴포넌트 렌더링 (onKeyUp prop)", () => {
    const onKeyUp = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onKeyUp,
    });
    const input = getByTestId("input");

    fireEvent.keyUp(input, { key: "A", code: 65 });

    expect(onKeyUp.mock.calls.length).toBe(1);
    expect(onKeyUp.mock.lastCall?.[0].key).toBe("A");
    expect(onKeyUp.mock.lastCall?.[0].code).toBe("65");
  });

  it("Input 컴포넌트 렌더링 (onFocus prop)", () => {
    const onFocus = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onFocus,
    });

    const input = getByTestId("input");

    act(() => input.focus());

    expect(onFocus.mock.calls.length).toBe(1);
    expect(input).toHaveFocus();
    expect(input).toHaveClass("input--focused");
  });

  it("Input 컴포넌트 렌더링 (onBlur prop)", () => {
    const onBlur = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onBlur,
    });
    const input = getByTestId("input");

    fireEvent.blur(input);

    expect(onBlur.mock.calls.length).toBe(1);
    expect(input).not.toHaveFocus();
    expect(input).not.toHaveClass("input--focused");
  });

  it("Input 컴포넌트 렌더링 (onFocusChange prop)", () => {
    const onFocusChange = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "input",
      onFocusChange,
    });
    const input = getByTestId("input");

    act(() => input.focus());

    expect(onFocusChange.mock.calls.length).toBe(1);
    expect(input).toHaveFocus();
    expect(input).toHaveClass("input--focused");

    act(() => input.blur());

    expect(onFocusChange.mock.calls.length).toBe(2);
    expect(input).not.toHaveFocus();
    expect(input).not.toHaveClass("input--focused");
  });

  it("Input 컴포넌트 렌더링 (onClear prop)", () => {
    const onClear = jest.fn();
    const { getByTestId, container } = setup({
      "data-testid": "input",
      value: "Hello, Input!",
      allowClear: true,
      onClear,
    });

    const input = getByTestId("input");
    const button = container.querySelector("button[data-testid=input-clear]");
    expect(button).toBeTruthy();
    if (!button) return;

    fireEvent.click(button);

    expect(onClear.mock.calls.length).toBe(1);
    expect(input).toHaveValue("Hello, Input!");
    expect(input).toHaveFocus();
  });

  it("Input 컴포넌트 렌더링 (isRequired prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      isRequired: true,
    });
    const input = getByTestId("input");

    expect(input).toBeRequired();
  });

  it("Input 컴포넌트 렌더링 (isDisabled prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      isDisabled: true,
    });
    const input = getByTestId("input");

    expect(input).toBeDisabled();
  });

  it("Input 컴포넌트 렌더링 (aria-errormessage prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      "aria-errormessage": "Hello, Input!",
    });
    const input = getByTestId("input");

    expect(input).toHaveAttribute("aria-errormessage", "Hello, Input!");
  });

  it("Input 컴포넌트 렌더링 (forwardRef prop)", () => {
    const ref = React.createRef<InputRef>();
    const { getByTestId } = render(
      <LayoutEmotion>
        <Input
          ref={ref}
          data-testid="input"
          aria-label="할 일을 입력하는 입력창"
          aria-labelledby="todo-title"
        />
      </LayoutEmotion>,
    );

    const input = getByTestId("input") as HTMLInputElement;

    expect(ref.current).not.toBeNull();
    expect(ref.current?.input).toBe(input);
    expect(ref.current?.focus).toBeInstanceOf(Function);
    expect(ref.current?.blur).toBeInstanceOf(Function);
    expect(ref.current?.setSelectionRange).toBeInstanceOf(Function);
    expect(ref.current?.select).toBeInstanceOf(Function);
  });
});
