import type { Interpolation, Theme } from "@emotion/react";
import type { ElementType } from "react";
import React from "react";

type AlignItems =
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "self-end"
  | "self-start"
  | "start"
  | "baseline"
  | "normal"
  | "stretch";

type JustifyContent =
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "stretch"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "start"
  | "left"
  | "normal"
  | "right";

type Position = "absolute" | "fixed" | "relative" | "static" | "sticky";

type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";

interface FlexProps<E extends ElementType> {
  as?: E;
  css?: Interpolation<Theme>;
  position?: Position;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexDirection?: FlexDirection;
  className?: string;
  children: React.ReactNode;
}

const Flex = <E extends ElementType>({
  as,
  css,
  position,
  justifyContent,
  flexDirection,
  alignItems,
  children,
  className,
}: FlexProps<E>) => {
  const Element = as ?? "div";

  return (
    <Element
      css={[
        {
          display: "flex",
          position,
          justifyContent,
          flexDirection,
          alignItems,
        },
        css,
      ]}
      className={className}
    >
      {children}
    </Element>
  );
};

export default Flex;
