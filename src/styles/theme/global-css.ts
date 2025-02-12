import type { CSSObject } from "@emotion/react";

import { palette } from "~/styles/styled-system/palette";

export const globalCss: CSSObject = {
  html: {
    textRendering: "optimizeLegibility",
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    fontFamily: `--font-pretendard`,
    color: palette.grayDark,
    lineHeight: 1.44,
  },
  "html, body": {
    height: "100%",
    width: "100%",
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
    backgroundColor: palette.backgroundGray,
  },
};
