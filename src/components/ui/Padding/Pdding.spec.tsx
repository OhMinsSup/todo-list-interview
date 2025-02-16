import "@testing-library/jest-dom";

import type { ElementType } from "react";
import { render } from "@testing-library/react";

import type { PaddingProps } from "./Padding";
import LayoutEmotion from "~/app/layout.emotion";
import Padding from "./Padding";

describe("Padding", () => {
  const setup = <E extends ElementType>(props: PaddingProps<E>) => {
    return render(
      <LayoutEmotion>
        <Padding {...props} />
      </LayoutEmotion>,
    );
  };

  it("Padding 컴포넌트 렌더링", () => {
    const { container } = setup({
      children: "Hello, Padding!",
    });
    expect(container).toHaveTextContent("Hello, Padding!");
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("Padding 컴포넌트 렌더링 (as prop)", () => {
    const { container } = setup({
      as: "section",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("Padding 컴포넌트 렌더링 (id prop)", () => {
    const { container } = setup({
      id: "padding",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("#padding")).toBeTruthy();
  });

  it("Padding 컴포넌트 렌더링 (className prop)", () => {
    const { container } = setup({
      className: "padding",
      children: "Hello, Padding!",
    });
    expect(container.querySelector(".padding")).toBeTruthy();
  });

  it("Padding 컴포넌트 렌더링 (all prop)", () => {
    const { container } = setup({
      all: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle("padding: 11px;");
  });

  it("Padding 컴포넌트 렌더링 (topBottom prop)", () => {
    const { container } = setup({
      topBottom: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "padding-top: 11px; padding-bottom: 11px;",
    );
  });

  it("Padding 컴포넌트 렌더링 (top prop)", () => {
    const { container } = setup({
      top: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle("padding-top: 11px;");
  });

  it("Padding 컴포넌트 렌더링 (bottom prop)", () => {
    const { container } = setup({
      bottom: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle("padding-bottom: 11px;");
  });

  it("Padding 컴포넌트 렌더링 (leftRight prop)", () => {
    const { container } = setup({
      leftRight: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "padding-left: 11px; padding-right: 11px;",
    );
  });

  it("Padding 컴포넌트 렌더링 (left prop)", () => {
    const { container } = setup({
      left: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle("padding-left: 11px;");
  });

  it("Padding 컴포넌트 렌더링 (rightLeft prop)", () => {
    const { container } = setup({
      rightLeft: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "padding-right: 11px; padding-left: 11px;",
    );
  });

  it("Padding 컴포넌트 렌더링 (right prop)", () => {
    const { container } = setup({
      right: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle("padding-right: 11px;");
  });

  it("Padding 컴포넌트 렌더링 (bottomTop prop)", () => {
    const { container } = setup({
      bottomTop: "11px",
      children: "Hello, Padding!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "padding-bottom: 11px; padding-top: 11px;",
    );
  });
});
