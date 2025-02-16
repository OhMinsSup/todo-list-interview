import type { Interpolation, Theme } from "@emotion/react";
import React, { useMemo } from "react";
import { useTheme } from "@emotion/react";

import type { ComponentType } from "./styles";
import {
  getCountStyle,
  getEmptyStyle,
  getFormInputErrorStyle,
  getGlobalErrorDescriptionTextStyle,
  getGlobalErrorTextStyle,
  getTitleStyle,
  getTodoEmptyStyle,
} from "./styles";

export interface TypographyProps {
  type?: ComponentType;
  className?: string;
  css?: Interpolation<Theme>;
  children: React.ReactNode;
  id?: string;
  [key: `data-${string}`]: string | undefined;
}

const Typography = ({
  type,
  children,
  css: customCss,
  ...props
}: TypographyProps) => {
  const theme = useTheme();
  const { element: Text, css } = useMemo(() => {
    switch (type) {
      case "count": {
        return getCountStyle(theme);
      }
      case "title": {
        return getTitleStyle(theme);
      }
      case "form-input-error": {
        return getFormInputErrorStyle(theme);
      }
      case "todo-empty": {
        return getTodoEmptyStyle(theme);
      }
      case "global-error-text": {
        return getGlobalErrorTextStyle(theme);
      }
      case "global-error-description-text": {
        return getGlobalErrorDescriptionTextStyle(theme);
      }
      default: {
        return getEmptyStyle();
      }
    }
  }, [type, theme]);

  return (
    <Text css={[css, customCss]} {...props}>
      {children}
    </Text>
  );
};

export default Typography;
