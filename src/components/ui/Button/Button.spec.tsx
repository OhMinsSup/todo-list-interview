import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { ButtonProps, ButtonRef } from "./Button";
import LayoutEmotion from "~/app/layout.emotion";
import Button from "./Button";

describe("Button", () => {
  const onClick = jest.fn();

  const setup = (props?: ButtonProps) => {
    return render(
      <LayoutEmotion>
        <Button aria-label="버튼" aria-labelledby="button-title" {...props} />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    onClick.mockClear();
  });

  it("Button 컴포넌트 렌더링", () => {
    const { getByTestId } = setup({
      children: "Click Me",
    });
    const button = getByTestId("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("Button 컴포넌트 렌더링 (disabled prop)", () => {
    const { getByTestId } = setup({
      isDisabled: true,
    });
    const button = getByTestId("button");

    expect(button).toBeDisabled();
  });

  it("Button 컴포넌트 렌더링 (onClick prop)", () => {
    const onClick = jest.fn();
    const { getByTestId, getByText } = setup({
      "data-testid": "button",
      onPress: onClick,
      children: "Click Me",
    });
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalled();
    const text = getByText("Click Me");
    expect(text).not.toBeNull();
  });

  it('Button 컴포넌트 렌더링 (variant="filled")', () => {
    const { getByTestId } = setup({
      color: "primary",
      variant: "filled",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--filled button--primary");
  });

  it('Button 컴포넌트 렌더링 (variant="ghost")', () => {
    const { getByTestId } = setup({
      color: "primary",
      variant: "ghost",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--ghost button--primary");
  });

  it('Button 컴포넌트 렌더링 (variant="text")', () => {
    const { getByTestId } = setup({
      variant: "text",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--text button--primary");
  });

  it('Button 컴포넌트 렌더링 (variant="solid")', () => {
    const { getByTestId } = setup({
      variant: "solid",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--solid button--primary");
  });

  it('Button 컴포넌트 렌더링 (variant="outlined")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      variant: "outlined",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--outlined button--primary");
  });

  it('Button 컴포넌트 렌더링 (color="primary")', () => {
    const { getByTestId } = setup({
      color: "primary",
      variant: "solid",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--primary button--solid");
  });

  it('Button 컴포넌트 렌더링 (color="default")', () => {
    const { getByTestId } = setup({
      color: "default",
      variant: "solid",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--default button--solid");
  });

  it('Button 컴포넌트 렌더링 (edge="default")', () => {
    const { getByTestId } = setup({
      edge: "default",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--default");
  });

  it('Button 컴포넌트 렌더링 (edge="circle")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      edge: "circle",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--circle");
  });

  it('Button 컴포넌트 렌더링 (size="round")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      edge: "round",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--round");
  });

  it('Button 컴포넌트 렌더링 (size="small")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "small",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--small");
  });

  it('Button 컴포넌트 렌더링 (size="medium")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "middle",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--middle");
  });

  it('Button 컴포넌트 렌더링 (size="large")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "large",
    });
    const button = getByTestId("button");

    expect(button).toHaveClass("button--large");
  });

  it("Button 컴포넌트 렌더링 (ref)", () => {
    const ref = React.createRef<ButtonRef>();
    const { getByTestId } = render(
      <LayoutEmotion>
        <Button
          data-testid="button"
          aria-label="버튼"
          aria-labelledby="button-title"
          ref={ref}
        />
      </LayoutEmotion>,
    );
    const button = getByTestId("button");

    expect(ref.current).not.toBeNull();
    expect(ref.current?.button).toBe(button);
    expect(ref.current?.focus).toBeInstanceOf(Function);
    expect(ref.current?.blur).toBeInstanceOf(Function);
  });
});
