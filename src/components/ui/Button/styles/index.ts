import type { CSSObject, Theme } from "@emotion/react";

export type ButtonSizeType = "small" | "middle" | "large" | undefined;

export const ButtonVariants = [
  "outlined",
  "solid",
  "filled",
  "ghost",
  "text",
] as const;

export type ButtonVariantsType = (typeof ButtonVariants)[number];

export const ButtonEdges = ["default", "circle", "round"] as const;
export type ButtonEdgesType = (typeof ButtonEdges)[number];

export const ButtonColors = ["default", "primary"] as const;

export type ButtonColorsType = (typeof ButtonColors)[number];

export const ButtonTypes = [
  "default",
  "primary",
  "text",
  "ghost",
  "filled",
] as const;
export type ButtonType = (typeof ButtonTypes)[number];

export const getButtonBaseStyle = (theme: Theme): CSSObject => {
  return {
    outline: "none",
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    touchAction: "manipulation",
    textAlign: "center",
    whiteSpace: "nowrap",
    fontWeight: theme.fontWeights.normal,
    borderStyle: "solid",
    borderWidth: theme.borderWidths["1px"],
    borderColor: theme.palette.transparent,
    color: theme.palette.textBase,
    gap: theme.spacing["8px"],
    transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
  };
};

export const getButtonSize = (
  size: ButtonSizeType,
  theme: Theme,
): CSSObject => {
  switch (size) {
    case "large": {
      return {
        fontSize: theme.fontSizes["16px"],
        height: "40px",
        padding: `0px ${theme.spacing["15px"]}`,
        borderRadius: theme.rounded["8px"],
      };
    }
    case "small": {
      return {
        fontSize: theme.fontSizes["14px"],
        height: "24px",
        padding: `0px ${theme.spacing["7px"]}`,
        borderRadius: theme.rounded["4px"],
      };
    }
    case "middle":
    default: {
      return {
        fontSize: theme.fontSizes["14px"],
        height: "32px",
        padding: `0px ${theme.spacing["15px"]}`,
        borderRadius: theme.rounded["6px"],
      };
    }
  }
};

const getShardFocusStyle = (theme: Theme): CSSObject => {
  return {
    ":not(:disabled):focus-visible": {
      outlineWidth: "3px",
      outlineStyle: "solid",
      outlineColor: theme.palette.primaryBorder,
      outlineOffset: "1px",
      transition: "outline-offset 0s, outline 0s",
    },
  };
};

export const getButtonVariant = (
  color: ButtonColorsType,
  variant: ButtonVariantsType,
  theme: Theme,
): CSSObject => {
  switch (variant) {
    case "filled": {
      return {
        color:
          color === "primary" ? theme.palette.primary : theme.palette.textBase,
        background:
          color === "primary"
            ? theme.palette.primaryBackground
            : theme.palette.fillTertiary,
        ...getShardFocusStyle(theme),
        ":not(:disabled):hover": {
          background:
            color === "primary"
              ? theme.palette.primaryBorder
              : theme.palette.fillSecondary,
        },
        ":not(:disabled):active": {
          background:
            color === "primary"
              ? theme.palette.primaryBorder
              : theme.palette.fillSecondary,
        },
      };
    }
    case "ghost": {
      return {
        color:
          color === "primary"
            ? theme.palette.primaryText
            : theme.button.textColor,
        ...getShardFocusStyle(theme),
        ":not(:disabled):hover": {
          color:
            color === "primary"
              ? theme.palette.primaryTextHover
              : theme.button.textHoverColor,
          background:
            color === "primary"
              ? theme.palette.primaryBackground
              : theme.button.textHoverBg,
        },
        ":not(:disabled):active": {
          color:
            color === "primary"
              ? theme.palette.primaryTextHover
              : theme.button.textHoverColor,
          background:
            color === "primary"
              ? theme.palette.primaryBackground
              : theme.button.textHoverBg,
        },
      };
    }
    case "text": {
      return {
        color:
          color === "primary"
            ? theme.palette.primaryText
            : theme.button.textColor,
        ...getShardFocusStyle(theme),
        ":not(:disabled):hover": {
          color:
            color === "primary"
              ? theme.palette.primaryTextHover
              : theme.button.textHoverColor,
        },
        ":not(:disabled):active": {
          color:
            color === "primary"
              ? theme.palette.primaryTextHover
              : theme.button.textHoverColor,
        },
      };
    }
    case "outlined": {
      return {
        color:
          color === "primary"
            ? theme.palette.primary
            : theme.button.defaultColor,
        borderColor:
          color === "primary"
            ? theme.palette.primary
            : theme.button.defaultBorderColor,
        background:
          color === "primary" ? theme.palette.white : theme.button.defaultBg,
        ...getShardFocusStyle(theme),
        ":not(:disabled):hover": {
          color: theme.button.defaultActiveColor,
          borderColor: theme.button.defaultActiveBorderColor,
          background: theme.button.defaultActiveBg,
        },
        ":not(:disabled):active": {
          color: theme.button.defaultActiveColor,
          borderColor: theme.button.defaultActiveBorderColor,
          background: theme.button.defaultActiveBg,
        },
      };
    }
    case "solid":
    default: {
      return {
        color:
          color === "primary"
            ? theme.palette.white
            : theme.button.solidTextColor,
        background:
          color === "primary"
            ? theme.palette.primary
            : theme.palette.backgroundSolid,
        ...getShardFocusStyle(theme),
        ":not(:disabled):hover": {
          color:
            color === "primary"
              ? theme.button.primary
              : theme.button.solidTextColor,
          background:
            color === "primary"
              ? theme.palette.primaryActive
              : theme.palette.backgroundSolidActive,
        },
        ":not(:disabled):active": {
          color:
            color === "primary"
              ? theme.button.primary
              : theme.button.solidTextColor,
          background:
            color === "primary"
              ? theme.palette.primaryActive
              : theme.palette.backgroundSolidActive,
        },
      };
    }
  }
};

export const getButtonEdge = (
  edge: ButtonEdgesType,
  theme: Theme,
): CSSObject => {
  switch (edge) {
    case "circle": {
      return {
        minWidth: "32px",
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
        borderRadius: "50%",
      };
    }
    case "round": {
      return {
        borderRadius: theme.rounded["32px"],
        paddingInlineStart: 16,
        paddingInlineEnd: 16,
      };
    }
    case "default":
    default: {
      return {};
    }
  }
};

export const getButtonDisabled = (theme: Theme): CSSObject => {
  return {
    ":disabled": {
      cursor: "not-allowed",
      borderColor: theme.palette.borderDisabled,
      color: theme.palette.textDisabled,
      background: theme.palette.bgContainerDisabled,
    },
  };
};
