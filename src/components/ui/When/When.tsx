import type React from "react";

export type BooleanLike = boolean | string | number | null | undefined;

export const getConditionResult = (
  condition: BooleanLike | ((...args: unknown[]) => BooleanLike),
): boolean => {
  const conditionResult = Boolean(
    typeof condition === "function" ? condition() : condition,
  );

  return conditionResult;
};

interface WhenProps {
  condition: (() => BooleanLike) | BooleanLike;
  children: React.ReactNode | ((...args: unknown[]) => JSX.Element);
}

const When = ({ condition, children }: WhenProps) => {
  const conditionResult = Boolean(getConditionResult(condition));
  return conditionResult && children ? (
    <>{typeof children === "function" ? children() : children}</>
  ) : null;
};

export default When;
