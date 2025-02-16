/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "@testing-library/jest-dom";

import React from "react";
import { act, fireEvent, render } from "@testing-library/react";

import type { InputProps, InputRef } from "./Input";
import LayoutEmotion from "~/app/layout.emotion";
import Input from "./Input";

describe("Input", () => {
  const onPressEnter = jest.fn();
  const onKeyDown = jest.fn();
  const onChange = jest.fn();
  const onKeyUp = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const onFocusChange = jest.fn();
  const onClear = jest.fn();

  const setup = (props?: InputProps) => {
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

  afterEach(() => {
    onPressEnter.mockClear();
    onKeyDown.mockClear();
    onChange.mockClear();
    onKeyUp.mockClear();
    onFocus.mockClear();
    onBlur.mockClear();
    onFocusChange.mockClear();
    onClear.mockClear();
  });

  it("Input 컴포넌트 렌더링", () => {
    const { getByTestId } = setup();
    const input = getByTestId("input");

    expect(input).toBeInTheDocument();
  });

  it("Input 컴포넌트 렌더링 (value prop)", () => {
    const { getByTestId } = setup({
      value: "Hello, Input!",
    });
    const input = getByTestId("input");

    expect(input).toHaveValue("Hello, Input!");
  });

  it("Input 컴포넌트 렌더링 (onChange prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      onChange,
    });
    const input = getByTestId("input");

    fireEvent.change(input, { target: { value: "Hello, Input!" } });

    expect(input).toHaveValue("Hello, Input!");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalled();
  });

  it("Input 컴포넌트 렌더링 (onPressEnter prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "input",
      onPressEnter,
      onKeyDown,
    });
    const input = getByTestId("input");

    fireEvent.keyDown(input, { key: "Enter", code: 13 });

    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalled();

    const lastCallKeyDown = onKeyDown.mock.lastCall?.[0];
    const lastCallPressEnter = onPressEnter.mock.lastCall?.[0];

    expect(lastCallKeyDown.key).toBe("Enter");
    expect(lastCallKeyDown.code).toBe("13");

    expect(lastCallPressEnter.key).toBe("Enter");
    expect(lastCallPressEnter.code).toBe("13");
  });

  it("Input 컴포넌트 렌더링 (onKeyDown prop)", () => {
    const { getByTestId } = setup({
      onKeyDown,
    });
    const input = getByTestId("input");

    fireEvent.keyDown(input, { key: "A", code: 65 });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalled();

    const lastCall = onKeyDown.mock.lastCall?.[0];
    expect(lastCall.key).toBe("A");
    expect(lastCall.code).toBe("65");
  });

  it("Input 컴포넌트 렌더링 (onKeyUp prop)", () => {
    const { getByTestId } = setup({
      onKeyUp,
    });
    const input = getByTestId("input");

    fireEvent.keyUp(input, { key: "A", code: 65 });

    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalled();

    const lastCall = onKeyUp.mock.lastCall?.[0];

    expect(lastCall.key).toBe("A");
    expect(lastCall.code).toBe("65");
  });

  it("Input 컴포넌트 렌더링 (onFocus prop)", () => {
    const { getByTestId } = setup({
      onFocus,
    });

    const input = getByTestId("input");

    act(() => input.focus());

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalled();

    expect(input).toHaveFocus();
    expect(input).toHaveClass("input--focused");
  });

  it("Input 컴포넌트 렌더링 (onBlur prop)", () => {
    const { getByTestId } = setup({
      onBlur,
    });
    const input = getByTestId("input");

    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalled();

    expect(input).not.toHaveFocus();
    expect(input).not.toHaveClass("input--focused");
  });

  it("Input 컴포넌트 렌더링 (onFocusChange prop)", () => {
    const { getByTestId } = setup({
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
    const { getByTestId, container } = setup({
      value: "Hello, Input!",
      allowClear: true,
      onClear,
    });

    const input = getByTestId("input");
    const button = container.querySelector("button[data-testid=input-clear]");
    expect(button).toBeTruthy();
    if (!button) return;

    fireEvent.click(button);

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalled();
    expect(input).toHaveValue("Hello, Input!");
    expect(input).toHaveFocus();
  });

  it("Input 컴포넌트 렌더링 (isRequired prop)", () => {
    const { getByTestId } = setup({
      isRequired: true,
    });
    const input = getByTestId("input");

    expect(input).toBeRequired();
  });

  it("Input 컴포넌트 렌더링 (isDisabled prop)", () => {
    const { getByTestId } = setup({
      isDisabled: true,
    });
    const input = getByTestId("input");

    expect(input).toBeDisabled();
  });

  it("Input 컴포넌트 렌더링 (aria-errormessage prop)", () => {
    const { getByTestId } = setup({
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
