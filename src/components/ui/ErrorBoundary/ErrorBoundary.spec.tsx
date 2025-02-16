import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";

import type { ErrorBoundaryProps } from "./ErrorBoundary";
import LayoutEmotion from "~/app/layout.emotion";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  const onClick = jest.fn();

  const setup = (props?: ErrorBoundaryProps) => {
    return render(
      <LayoutEmotion>
        <ErrorBoundary {...props} />
      </LayoutEmotion>,
    );
  };

  afterEach(() => {
    onClick.mockClear();
  });

  it("ErrorBoundary 컴포넌트 렌더링", () => {
    const { getByTestId } = setup();
    const statusCode = getByTestId("status-code");
    const title = getByTestId("title");
    const description = getByTestId("description");
    const button = getByTestId("button");

    expect(statusCode).toHaveTextContent("500");
    expect(title).toHaveTextContent("서버에서 오류가 발생했습니다.:')");
    expect(description).toHaveTextContent(
      "불편을 끼쳐드려 죄송합니다. 나중에 다시 시도해 주세요.",
    );
    expect(button).toHaveTextContent("새로고침");
  });

  it("ErrorBoundary 컴포넌트 렌더링 (statusCode prop)", () => {
    const { getByTestId } = setup({ statusCode: 404 });
    const statusCode = getByTestId("status-code");

    expect(statusCode).toHaveTextContent("404");
  });

  it("ErrorBoundary 컴포넌트 렌더링 (title prop)", () => {
    const { getByTestId } = setup({ title: "Hello, ErrorBoundary!" });
    const title = getByTestId("title");

    expect(title).toHaveTextContent("Hello, ErrorBoundary!");
  });

  it("ErrorBoundary 컴포넌트 렌더링 (description prop)", () => {
    const { getByTestId } = setup({ description: "Hello, ErrorBoundary!" });
    const description = getByTestId("description");

    expect(description).toHaveTextContent("Hello, ErrorBoundary!");
  });

  it("ErrorBoundary 컴포넌트 렌더링 (buttonText prop)", () => {
    const { getByTestId } = setup({ buttonText: "Hello, ErrorBoundary!" });
    const button = getByTestId("button");

    expect(button).toHaveTextContent("Hello, ErrorBoundary!");
  });

  it("ErrorBoundary 컴포넌트 렌더링 (onClick prop)", () => {
    const { container } = setup({ onClick });
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalled();
  });
});
