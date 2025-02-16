import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import type { WhenProps } from "./When";
import When from "./When";

describe("When", () => {
  const setup = (props: WhenProps) => {
    return render(<When {...props} />);
  };

  it("When 컴포넌트 렌더링", () => {
    const { container } = setup({
      condition: true,
      children: "Hello, When!",
    });

    expect(container).toHaveTextContent("Hello, When!");
  });

  it("When 컴포넌트 렌더링 (condition: false)", () => {
    const { container } = setup({
      condition: false,
      children: "Hello, When!",
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("When 컴포넌트 렌더링 (condition: function false)", () => {
    const { container } = setup({
      condition: () => false,
      children: "Hello, When!",
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("When 컴포넌트 렌더링 (condition: function true)", () => {
    const { container } = setup({
      condition: () => true,
      children: "Hello, When!",
    });

    expect(container).toHaveTextContent("Hello, When!");
  });

  it("When 컴포넌트 렌더링 (children: function, condition: true)", () => {
    const { container } = setup({
      condition: true,
      children: () => "Hello, When!",
    });

    expect(container).toHaveTextContent("Hello, When!");
  });

  it("When 컴포넌트 렌더링 (children: function, condition: false)", () => {
    const { container } = setup({
      condition: false,
      children: () => "Hello, When!",
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("When 컴포넌트 렌더링 (children: function, condition: function false)", () => {
    const { container } = setup({
      condition: () => false,
      children: () => "Hello, When!",
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("When 컴포넌트 렌더링 (children: function, condition: function true)", () => {
    const { container } = setup({
      condition: () => true,
      children: () => "Hello, When!",
    });

    expect(container).toHaveTextContent("Hello, When!");
  });
});
