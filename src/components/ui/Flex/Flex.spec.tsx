import "@testing-library/jest-dom";

import type { ElementType } from "react";
import { render } from "@testing-library/react";

import type { FlexProps } from "./Flex";
import LayoutEmotion from "~/app/layout.emotion";
import Flex from "./Flex";

describe("Flex", () => {
  const setup = <E extends ElementType>(props: FlexProps<E>) => {
    return render(
      <LayoutEmotion>
        <Flex {...props} />
      </LayoutEmotion>,
    );
  };

  it("Flex 컴포넌트 렌더링", () => {
    const { container } = setup({
      children: "Hello, Flex!",
    });
    expect(container).toHaveTextContent("Hello, Flex!");
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("Flex 컴포넌트 렌더링 (as prop)", () => {
    const { container } = setup({
      as: "section",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("Flex 컴포넌트 렌더링 (position prop)", () => {
    const { container } = setup({
      position: "absolute",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveStyle("position: absolute;");
  });

  it("Flex 컴포넌트 렌더링 (alignItems prop)", () => {
    const { container } = setup({
      alignItems: "center",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveStyle("align-items: center;");
  });

  it("Flex 컴포넌트 렌더링 (justifyContent prop)", () => {
    const { container } = setup({
      justifyContent: "center",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "justify-content: center;",
    );
  });

  it("Flex 컴포넌트 렌더링 (flexDirection prop)", () => {
    const { container } = setup({
      flexDirection: "column",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "flex-direction: column;",
    );
  });

  it("Flex 컴포넌트 렌더링 (css prop)", () => {
    const { container } = setup({
      css: {
        backgroundColor: "red",
      },
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveStyle(
      "background-color: red;",
    );
  });

  it("Flex 컴포넌트 렌더링 (className prop)", () => {
    const { container } = setup({
      className: "test-class",
      children: "Hello, Flex!",
    });
    expect(container.querySelector("div")).toHaveClass("test-class");
  });
});
