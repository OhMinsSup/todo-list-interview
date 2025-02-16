import type { CSSObject, Theme } from "@emotion/react";

type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

export type ComponentType =
  | "count"
  | "title"
  | "form-input-error"
  | "todo-empty"
  | "global-error-text"
  | "global-error-description-text";

interface Style {
  element: ElementType;
  css: CSSObject;
}

export const getCountStyle = (theme: Theme): Style => {
  return {
    element: "span",
    css: {
      color: theme.palette.textBase,
      fontWeight: theme.fontWeights.medium,
    },
  };
};

export const getTitleStyle = (theme: Theme): Style => {
  return {
    element: "h1",
    css: {
      fontSize: theme.fontSizes["38px"],
      fontWeight: theme.fontWeights.bold,
      color: theme.palette.textBase,
    },
  };
};

export const getFormInputErrorStyle = (theme: Theme): Style => {
  return {
    element: "span",
    css: {
      width: theme.sizes.full,
      fontWeight: theme.fontWeights.semibold,
      color: theme.palette.error,
      display: "block",
      padding: `${theme.spacing["8px"]} ${theme.spacing["4px"]}`,
    },
  };
};

export const getTodoEmptyStyle = (theme: Theme): Style => {
  return {
    element: "p",
    css: {
      color: theme.palette.textSecondary,
    },
  };
};

export const getGlobalErrorTextStyle = (theme: Theme): Style => {
  return {
    element: "span",
    css: {
      fontWeight: theme.fontWeights.semibold,
    },
  };
};

export const getGlobalErrorDescriptionTextStyle = (theme: Theme): Style => {
  return {
    element: "p",
    css: {
      textAlign: "center",
      fontSize: theme.palette.textTertiary,
    },
  };
};

export const getEmptyStyle = (): Style => {
  return {
    element: "div",
    css: {},
  };
};
