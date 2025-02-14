import type { CSSObject } from "@emotion/react";

import { palette } from "~/styles/styled-system/palette";

export const globalCss: CSSObject = {
  html: {
    textRendering: "optimizeLegibility",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    fontFamily: "--font-pretendard",
    color: palette.grayDark,
    overflowX: "hidden",
    lineHeight: 1,
  },
  "*, :after, :before": {
    boxSizing: "border-box",
    border: `0 solid ${palette.gray}`,
    outline: `0 solid ${palette.gray}`,
  },
  "*": {
    margin: 0,
    padding: 0,
    color: "inherit",
    font: "inherit",
    backgroundColor: "transparent",
  },
  body: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: palette.backgroundGray,
  },
};
