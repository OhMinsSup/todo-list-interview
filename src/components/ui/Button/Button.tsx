"use client";

import type { Interpolation, Theme } from "@emotion/react";
import type { AriaButtonOptions } from "@react-aria/button";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import { useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import classnames from "classnames";

import type {
  ButtonColorsType,
  ButtonEdgesType,
  ButtonSizeType,
  ButtonVariantsType,
} from "~/components/ui/Button/styles";
import {
  getButtonBaseStyle,
  getButtonDisabled,
  getButtonEdge,
  getButtonSize,
  getButtonVariant,
} from "~/components/ui/Button/styles";

export interface ButtonProps extends AriaButtonOptions<"button"> {
  variant?: ButtonVariantsType;
  color?: ButtonColorsType;
  edge?: ButtonEdgesType;
  size?: ButtonSizeType;
  disabled?: boolean;
  css?: Interpolation<Theme>;
  className?: string;
  children?: React.ReactNode;
  [key: `data-${string}`]: string | undefined;
}

export interface ButtonRef {
  focus: (options?: FocusOptions) => void;
  blur: () => void;
  button: HTMLButtonElement | null;
}

type ColorVariantPairType = [
  color: ButtonColorsType,
  variant: ButtonVariantsType,
];

const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    color,
    size = "middle",
    variant,
    edge = "default",
    css: customCss,
    className,
    children,
    ...resetProps
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const theme = useTheme();

  const { buttonProps } = useButton(resetProps, buttonRef);

  const [mergedColor, mergedVariant] = useMemo<ColorVariantPairType>(() => {
    if (color && variant) {
      return [color, variant];
    }
    return ["primary", "solid"];
  }, [color, variant]);

  useImperativeHandle(ref, () => ({
    focus: (options) => {
      buttonRef.current?.focus(options);
    },
    blur: () => {
      buttonRef.current?.blur();
    },
    button: buttonRef.current,
  }));

  const mergedClassName = classnames(
    className,
    "button",
    `button--${size}`,
    `button--${edge}`,
    `button--${mergedColor}`,
    `button--${mergedVariant}`,
  );

  return (
    <button
      ref={buttonRef}
      css={[
        getButtonBaseStyle(theme),
        getButtonSize(size, theme),
        getButtonVariant(mergedColor, mergedVariant, theme),
        getButtonEdge(edge, theme),
        getButtonDisabled(theme),
        customCss,
      ]}
      className={mergedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

export default Button;
