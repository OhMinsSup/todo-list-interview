export const palette = {
  current: "currentColor",
  transparent: "transparent",

  // colors
  primary: "#2182F3",
  primaryBackground: "#e6f4ff",
  primaryHoverBackground: "#bae0ff",
  primaryBorder: "#91caff",
  primaryBorderHover: "#69b1ff",
  primaryHover: "#4096ff",
  primaryActive: "#0958d9",
  primaryTextHover: "#4096ff",
  primaryText: "#1677ff",
  primaryTextActive: "#0958d9",

  default: "#000000e0",
  defaultBorder: "#d9d9d9",
  defaultHoverBorder: "#4096ff",

  white: "#ffffff",
  black: "#000000",

  // text
  textBase: "#000",
  textSecondary: "rgba(0, 0, 0, 0.65)",
  textTertiary: "rgba(0, 0, 0, 0.45)",
  textQuaternary: "rgba(0, 0, 0, 0.25)",

  // background
  backgroundBase: "#fff",
  backgroundGray: "#F6F6F6",

  gray: "#848484",
  grayLight: "#E5E5E5",
  grayDark: "#333333",

  // disabled
  textDisabled: "#00000040",
  bgContainerDisabled: "#0000000a",
  borderDisabled: "#d9d9d9",

  // fill
  fill: "#00000005",
  fillTertiary: "#0000000a",
  fillSecondary: "#0000000f",
  fillQuaternary: "#00000005",

  // solid
  backgroundSolid: "#000",
  backgroundSolidHover: "#000000bf",
  backgroundSolidActive: "#000000f2",
};

export type Palette = keyof typeof palette;
