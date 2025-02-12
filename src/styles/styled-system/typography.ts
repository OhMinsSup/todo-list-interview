import { fontWeights } from "./fontWeights";

export const fontSizes = {
  default: "16px",
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
  "2xl": "40px",
  "3xl": "48px",
  "4xl": "56px",
  "5xl": "64px",
};

export type FontSize = keyof typeof fontSizes;

export const textStyles = {
  title: {
    fontSize: fontSizes["4xl"],
    fontWeight: fontWeights.bold,
  },
  tab: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  text: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
  },
  placeholder: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
  },
};

export type TextStyle = keyof typeof textStyles;

export const typography = {
  fontSizes,
  fontWeights,
  textStyles,
};

export type Typography = keyof typeof typography;
