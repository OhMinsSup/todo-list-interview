import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import type { TypographyProps } from "./Typography";
import LayoutEmotion from "~/app/layout.emotion";
import Typography from "./Typography";

describe("Typography", () => {
  const setup = (props: TypographyProps) => {
    return render(
      <LayoutEmotion>
        <Typography {...props} />
      </LayoutEmotion>,
    );
  };

  it("Typography 컴포넌트 렌더링", () => {
    const { container } = setup({
      children: "Hello, Typography!",
    });
    expect(container).toHaveTextContent("Hello, Typography!");
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("Typography 컴포넌트 렌더링 (id prop)", () => {
    const { container } = setup({
      id: "typography",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("#typography")).toBeTruthy();
  });

  it("Typography 컴포넌트 렌더링 (className prop)", () => {
    const { container } = setup({
      className: "typography",
      children: "Hello, Typography!",
    });
    expect(container.querySelector(".typography")).toBeTruthy();
  });

  it("Typography 컴포넌트 렌더링 (css prop)", () => {
    const { container } = setup({
      css: {
        color: "red",
      },
      children: "Hello, Typography!",
    });
    expect(container.querySelector("div")).toHaveStyle("color: red;");
  });

  it("Typography 컴포넌트 렌더링 (type=count prop)", () => {
    const { container } = setup({
      type: "count",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("span")).toHaveStyle(
      "color: #000; font-weight: 500;",
    );
  });

  it("Typography 컴포넌트 렌더링 (type=title prop)", () => {
    const { container } = setup({
      type: "title",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("h1")).toHaveStyle(
      "color: #000; font-weight: 700; font-size: 38px;",
    );
  });

  it("Typography 컴포넌트 렌더링 (type=form-input-error prop)", () => {
    const { container } = setup({
      type: "form-input-error",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("span")).toHaveStyle(
      "width: 100%; font-weight: 600; color: #ff4d4f; display: block; padding: 8px 4px;",
    );
  });

  it("Typography 컴포넌트 렌더링 (type=todo-empty prop)", () => {
    const { container } = setup({
      type: "todo-empty",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("p")).toHaveStyle(
      "color: rgba(0, 0, 0, 0.65);",
    );
  });

  it("Typography 컴포넌트 렌더링 (type=global-error-text prop)", () => {
    const { container } = setup({
      type: "global-error-text",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("span")).toHaveStyle("font-weight: 600;");
  });

  it("Typography 컴포넌트 렌더링 (type=global-error-description-text prop)", () => {
    const { container } = setup({
      type: "global-error-description-text",
      children: "Hello, Typography!",
    });
    expect(container.querySelector("p")).toHaveStyle(
      "text-align: center; color: rgba(0, 0, 0, 0.45);",
    );
  });
});
