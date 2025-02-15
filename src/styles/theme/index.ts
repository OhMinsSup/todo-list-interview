import type { Theme } from "@emotion/react";

import type { Border } from "~/styles/styled-system/border";
import type { BorderWidth } from "~/styles/styled-system/borderWidths";
import type { MediaQueries } from "~/styles/styled-system/breakpoints";
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
import { mediaQueries } from "~/styles/styled-system/breakpoints";
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
  mq: mediaQueries,
  // ui component styles
  button,
  input,
};

// declare module로 이렇게 설정을 안하면 remix에서 data() 으로 리턴한
// 값이 잘못된 타입으로 인식되어서 에러가 발생한다.
declare module "@emotion/react" {
  export interface Theme {
    palette: Record<Palette, string>;
    lineHeights: Record<LineHeight, string>;
    border: Record<Border, string>;
    rounded: Record<Rounded, string>;
    shadows: Record<Shadows, string>;
    sizes: Record<Size, string>;
    spacing: Record<Spacing, string>;
    fontSizes: Record<FontSize, string>;
    fontWeights: Record<FontWeight, string>;
    opacity: Record<Opacity, string>;
    borderWidths: Record<BorderWidth, string>;
    zIndex: Record<ZIndex, string>;
    mq: Record<MediaQueries, string>;
    button: Record<Button, string>;
    input: Record<Input, string>;
  }
}
