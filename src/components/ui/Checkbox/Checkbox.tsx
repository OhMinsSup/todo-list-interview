import type { Interpolation, Theme } from "@emotion/react";
import type { AriaCheckboxProps } from "@react-aria/checkbox";
import type { ToggleStateOptions } from "@react-stately/toggle";
import React, { useImperativeHandle, useRef } from "react";
import { useTheme } from "@emotion/react";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import classNames from "classnames";

import { Icons } from "~/components/icons";
import { getCheckboxBaseStyle, getCheckboxLabelStyle } from "./styles";

export interface CheckboxProps extends ToggleStateOptions, AriaCheckboxProps {
  children?: React.ReactNode;
  css?: Interpolation<Theme>;
  className?: string;
  [key: `data-${string}`]: string | undefined;
}

export interface CheckboxRef {
  focus: (options?: FocusOptions) => void;
  blur: () => void;
  label: HTMLLabelElement | null;
  input: HTMLInputElement | null;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const { children, css, className, ...resetProps } = props;

  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const state = useToggleState(resetProps);

  const { inputProps } = useCheckbox(resetProps, state, inputRef);

  useImperativeHandle(ref, () => ({
    focus: (options) => {
      inputRef.current?.focus(options);
    },
    blur: () => {
      inputRef.current?.blur();
    },
    input: inputRef.current,
    label: labelRef.current,
  }));

  const { isFocusVisible, focusProps } = useFocusRing();
  const isSelected = state.isSelected;

  const mergedClassName = classNames(
    className,
    "checkbox",
    `checkbox--${state.isSelected ? "checked" : "unchecked"}`,
    `checkbox--${isFocusVisible ? "focus-visible" : "focus-hidden"}`,
  );

  return (
    <label
      ref={labelRef}
      className={mergedClassName}
      css={[getCheckboxLabelStyle(theme, isFocusVisible), css]}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={inputRef} />
      </VisuallyHidden>
      <div css={getCheckboxBaseStyle(theme, isSelected)}>
        <Icons.Check fill={isSelected ? theme.palette.white : "none"} />
      </div>
      {children}
    </label>
  );
});

export default Checkbox;
