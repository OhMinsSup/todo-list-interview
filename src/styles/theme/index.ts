import type { Theme } from "@emotion/react";

import type { Border } from "~/styles/styled-system/border";
import type { BorderWidth } from "~/styles/styled-system/borderWidths";
import type { Button } from "~/styles/styled-system/button";
import type { FontSize } from "~/styles/styled-system/fontSizes";
import type { FontWeight } from "~/styles/styled-system/fontWeights";
import type { Input } from "~/styles/styled-system/input";
import type { LineHeight } from "~/styles/styled-system/lineHeights";
import type { Opacity } from "~/styles/styled-system/opacity";
import type { Palette } from "~/styles/styled-system/palette";
import type { Rounded } from "~/styles/styled-system/rounded";
import type { Shadows } from "~/styles/styled-system/shadows";
import type { Size } from "~/styles/styled-system/sizes";
import type { Spacing } from "~/styles/styled-system/spacing";
import type { ZIndex } from "~/styles/styled-system/zIndex";
import { border } from "~/styles/styled-system/border";
import { borderWidths } from "~/styles/styled-system/borderWidths";
import { button } from "~/styles/styled-system/button";
import { fontSizes } from "~/styles/styled-system/fontSizes";
import { fontWeights } from "~/styles/styled-system/fontWeights";
import { input } from "~/styles/styled-system/input";
import { lineHeights } from "~/styles/styled-system/lineHeights";
import { opacity } from "~/styles/styled-system/opacity";
import { palette } from "~/styles/styled-system/palette";
import { rounded } from "~/styles/styled-system/rounded";
import { shadows } from "~/styles/styled-system/shadows";
import { sizes } from "~/styles/styled-system/sizes";
import { spacing } from "~/styles/styled-system/spacing";
import { zIndex } from "~/styles/styled-system/zIndex";

export const theme: Partial<Theme> = {
  palette,
  border,
  rounded,
  shadows,
  sizes,
  spacing,
  lineHeights,
  fontSizes,
  fontWeights,
  opacity,
  borderWidths,
  zIndex,
  // ui component styles
  button,
  input,
};

// declare module로 이렇게 설정을 안하면 remix에서 data() 으로 리턴한
// 값이 잘못된 타입으로 인식되어서 에러가 발생한다.
declare module "@emotion/react" {
  export interface Theme {
    palette: {
      [key in Palette]: string;
    };
    lineHeights: {
      [key in LineHeight]: string;
    };
    border: {
      [key in Border]: string;
    };
    rounded: {
      [key in Rounded]: string;
    };
    shadows: {
      [key in Shadows]: string;
    };
    sizes: {
      [key in Size]: string;
    };
    spacing: {
      [key in Spacing]: string;
    };
    fontSizes: {
      [key in FontSize]: string;
    };
    fontWeights: {
      [key in FontWeight]: string;
    };
    opacity: {
      [key in Opacity]: string;
    };
    borderWidths: {
      [key in BorderWidth]: string;
    };
    zIndex: {
      [key in ZIndex]: string;
    };
    button: {
      [key in Button]: string;
    };
    input: {
      [key in Input]: string;
    };
  }
}
