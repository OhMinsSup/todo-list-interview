import type { CSSObject, Theme } from "@emotion/react";

export const getCheckboxLabelStyle = (
  theme: Theme,
  isFocusVisible: boolean,
): CSSObject => {
  return {
    display: "inline-flex",
    cursor: "pointer",
    alignItems: "baseline",
    color: theme.palette.textBase,
    borderRadius: theme.rounded.full,
    fontSize: theme.fontSizes["14px"],
    ...(isFocusVisible && {
      outlineWidth: "3px",
      outlineStyle: "solid",
      outlineColor: theme.palette.primaryBorder,
      outlineOffset: "1px",
      transition: "outline-offset 0s, outline 0s",
    }),
  };
};

export const getCheckboxBaseStyle = (
  theme: Theme,
  isSelected: boolean,
): CSSObject => {
  return {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    borderRadius: theme.rounded.full,
    cursor: "pointer",
    border: isSelected
      ? "none"
      : `${theme.borderWidths["1px"]} solid ${theme.palette.defaultBorder}`,
    background: isSelected ? theme.palette.primary : theme.palette.transparent,
  };
};
