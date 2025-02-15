import type { CSSObject, Theme } from "@emotion/react";

export const getInputBaseStyle = (theme: Theme): CSSObject => {
  return {
    position: "relative",
    display: "inline-block",
    width: theme.sizes.full,
    minWidth: theme.sizes[0],
    color: theme.palette.textBase,
    transition: "all 0.2s",
    //
    background: theme.palette.grayLight,
    border: theme.border.none,
    "::placeholder": {
      color: theme.palette.gray,
    },
    ":placeholder-shown": {
      textOverflow: "ellipsis",
    },
    //
    padding: `${theme.spacing["28px"]} ${theme.spacing["32px"]}`,
    fontSize: theme.fontSizes["20px"],
    borderRadius: theme.rounded["24px"],
    lineHeight: theme.lineHeights.none,
    //
    "&:focus, &:focus-within": {
      borderColor: theme.input.activeBorderColor,
      outline: 0,
      backgroundColor: theme.input.activeBg,
      // outline: "none",
    },
    //
    "&:hover": {
      borderColor: theme.input.hoverBorderColor,
      backgroundColor: theme.input.hoverBg,
    },
    //
    ":disabled": {
      cursor: "not-allowed",
      opacity: theme.opacity["100"],
      color: theme.palette.textDisabled,
      backgroundColor: theme.palette.bgContainerDisabled,
      borderColor: theme.palette.borderDisabled,
    },
  };
};

export const getSuffixedWrapperStyle = (theme: Theme): CSSObject => {
  return {
    display: "inline-flex",
    width: theme.sizes.full,
    position: "relative",
    minWidth: 0,
  };
};

export const getButtonAllowedClearStyle = (
  theme: Theme,
  hidden: boolean,
): CSSObject => {
  return {
    margin: 0,
    padding: 0,
    lineHeight: 0,
    color: theme.palette.textDisabled,
    fontSize: theme.fontSizes["12px"],
    verticalAlign: "-1px",
    cursor: "pointer",
    transition: "color 0.3s",
    border: "none",
    outline: "none",
    backgroundColor: theme.palette.transparent,
    visibility: hidden ? "hidden" : "visible",
  };
};

export const getButtonAllowedWrapperStyle = (theme: Theme): CSSObject => {
  return {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    padding: theme.spacing["16px"],
  };
};
