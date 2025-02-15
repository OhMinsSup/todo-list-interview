import type { ElementType } from "react";
import React, { useMemo } from "react";

import type { PxObject } from "~/styles/styled-system/helpers";

type Value = keyof PxObject<101>;

type PaddingValue =
  | Value
  | { top: Value; right: Value; bottom: Value; left: Value };

type PaddingKeys =
  | "all"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "leftRight"
  | "rightLeft"
  | "topBottom"
  | "bottomTop";

type PaddingObject = Record<PaddingKeys, PaddingValue>;

interface PaddingProps<E extends ElementType> extends Partial<PaddingObject> {
  as?: E;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

function calculatePaddingValue(value: PaddingValue) {
  if (typeof value === "object") {
    const strings = [];
    for (const key of ["top", "right", "bottom", "left"] as const) {
      if (typeof value[key] === "string") {
        strings.push(value[key]);
      }
    }
    return strings.join(" ");
  }
  return value;
}

// priority: all > topBottom > top > bottom > leftRight > left > rightLeft > right > bottomTop > default
function getPaddingStyle<E extends ElementType>({
  all,
  top,
  right,
  bottom,
  left,
  leftRight,
  rightLeft,
  topBottom,
  bottomTop,
}: Omit<PaddingProps<E>, "as" | "children">) {
  if (all) {
    return {
      padding: calculatePaddingValue(all),
    };
  }

  if (topBottom) {
    return {
      paddingTop: calculatePaddingValue(topBottom),
      paddingBottom: calculatePaddingValue(topBottom),
    };
  }

  if (top) {
    return {
      paddingTop: calculatePaddingValue(top),
    };
  }

  if (bottom) {
    return {
      paddingBottom: calculatePaddingValue(bottom),
    };
  }

  if (leftRight) {
    return {
      paddingLeft: calculatePaddingValue(leftRight),
      paddingRight: calculatePaddingValue(leftRight),
    };
  }

  if (left) {
    return {
      paddingLeft: calculatePaddingValue(left),
    };
  }

  if (rightLeft) {
    return {
      paddingRight: calculatePaddingValue(rightLeft),
      paddingLeft: calculatePaddingValue(rightLeft),
    };
  }

  if (right) {
    return {
      paddingRight: calculatePaddingValue(right),
    };
  }

  if (bottomTop) {
    return {
      paddingBottom: calculatePaddingValue(bottomTop),
      paddingTop: calculatePaddingValue(bottomTop),
    };
  }

  return undefined;
}

const Padding = <E extends ElementType>({
  as,
  children,
  id,
  className,
  ...syles
}: PaddingProps<E>) => {
  const Element = as ?? "div";
  const paddingStyle = useMemo(() => getPaddingStyle(syles), [syles]);
  return (
    <Element id={id} className={className} css={paddingStyle}>
      {children}
    </Element>
  );
};

export default Padding;
