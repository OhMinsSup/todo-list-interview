import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import type { ButtonProps, ButtonRef } from "./Button";
import LayoutEmotion from "~/app/layout.emotion";
import Button from "./Button";

describe("Button", () => {
  const setup = (props: ButtonProps) => {
    return render(
      <LayoutEmotion>
        <Button aria-label="버튼" aria-labelledby="button-title" {...props} />
      </LayoutEmotion>,
    );
  };

  it("Button 컴포넌트 렌더링", () => {
    const { getByTestId } = setup({
      "data-testid": "button",
    });
    const button = getByTestId("button");

    expect(button).toBeInTheDocument();
    expect(button.classList.contains("button--primary")).toBe(true);
    expect(button.classList.contains("button--solid")).toBe(true);
  });

  it("Button 컴포넌트 렌더링 (disabled prop)", () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      isDisabled: true,
    });
    const button = getByTestId("button");

    expect(button).toBeDisabled();
  });

  it("Button 컴포넌트 렌더링 (onClick prop)", () => {
    const onClick = jest.fn();
    const { getByTestId } = setup({
      "data-testid": "button",
      onPress: onClick,
    });
    const button = getByTestId("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('Button 컴포넌트 렌더링 (variant="filled")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      color: "primary",
      variant: "filled",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--filled")).toBe(true);
    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (variant="ghost")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      color: "primary",
      variant: "ghost",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--ghost")).toBe(true);
    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (variant="text")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      variant: "text",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--text")).toBe(true);
    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (variant="solid")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      variant: "solid",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--solid")).toBe(true);
    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (variant="outlined")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      variant: "outlined",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--outlined")).toBe(true);
    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (color="primary")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      color: "primary",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--primary")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (color="default")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      color: "default",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--default")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (edge="default")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      edge: "default",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--default")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (edge="circle")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      edge: "circle",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--circle")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (size="round")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      edge: "round",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--round")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (size="small")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "small",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--small")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (size="medium")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "middle",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--middle")).toBe(true);
  });

  it('Button 컴포넌트 렌더링 (size="large")', () => {
    const { getByTestId } = setup({
      "data-testid": "button",
      size: "large",
    });
    const button = getByTestId("button");

    expect(button.classList.contains("button--large")).toBe(true);
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
