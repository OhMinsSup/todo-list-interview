"use client";

import type { Interpolation, Theme } from "@emotion/react";
import type { AriaTextFieldProps } from "@react-aria/textfield";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTheme } from "@emotion/react";
import { useTextField } from "@react-aria/textfield";
import classNames from "classnames";

import { Icons } from "~/components/icons";
import {
  getButtonAllowedClearStyle,
  getButtonAllowedWrapperStyle,
  getInputBaseStyle,
  getSuffixedWrapperStyle,
} from "./styles";

export interface InputProps extends AriaTextFieldProps {
  label?: React.ReactNode;
  className?: string;
  css?: Interpolation<Theme>;
  allowClear?: boolean;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onClear?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: `data-${string}`]: string | undefined;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
  setSelectionRange: (
    start: number,
    end: number,
    direction?: "forward" | "backward" | "none",
  ) => void;
  select: () => void;
  input: HTMLInputElement | null;
}

interface InputFocusOptions extends FocusOptions {
  cursor?: "start" | "end" | "all";
}

function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element.focus(option);

  const { cursor } = option ?? {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case "start":
        element.setSelectionRange(0, 0);
        break;

      case "end":
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

interface InputWithSuffixProps {
  children: React.ReactNode;
}

const InputWithSuffix = ({ children }: InputWithSuffixProps) => {
  const theme = useTheme();
  return <div css={getSuffixedWrapperStyle(theme)}>{children}</div>;
};

const Input = React.forwardRef<InputRef, InputProps>(
  (props: InputProps, ref) => {
    const {
      onPressEnter,
      label,
      autoComplete,
      allowClear,
      css: customCss,
      onFocus: _onFocus,
      onBlur: _onBlur,
      onFocusChange: _onFocusChange,
      onClear: _onClear,
      onKeyDown: _onKeyDown,
      onKeyUp: _onKeyUp,
      ...resetProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const keyLockRef = useRef(false);
    const [focused, setFocused] = useState(false);

    const theme = useTheme();

    const focus = useCallback((option?: InputFocusOptions) => {
      if (inputRef.current) {
        triggerFocus(inputRef.current, option);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      focus,
      blur: () => {
        inputRef.current?.blur();
      },
      setSelectionRange: (
        start: number,
        end: number,
        direction?: "forward" | "backward" | "none",
      ) => {
        inputRef.current?.setSelectionRange(start, end, direction);
      },
      select: () => {
        inputRef.current?.select();
      },
      input: inputRef.current,
    }));

    const mergedClassName = classNames(props.className, "input", {
      "input--allow-clear": allowClear,
      "input--disabled": props.isDisabled,
      "input--focused": focused,
    });

    const onKeyDown = useCallback(
      (
        e: Parameters<
          NonNullable<AriaTextFieldProps<HTMLInputElement>["onKeyDown"]>
        >[0],
      ) => {
        if (onPressEnter && e.key === "Enter" && !keyLockRef.current) {
          keyLockRef.current = true;
          onPressEnter(e);
        }
        _onKeyDown?.(e);
      },
      [onPressEnter, _onKeyDown],
    );

    const onKeyUp = useCallback(
      (
        e: Parameters<
          NonNullable<AriaTextFieldProps<HTMLInputElement>["onKeyUp"]>
        >[0],
      ) => {
        if (e.key === "Enter") {
          keyLockRef.current = false;
        }
        _onKeyUp?.(e);
      },
      [_onKeyUp],
    );

    const onFocus = useCallback(
      (
        e: Parameters<
          NonNullable<AriaTextFieldProps<HTMLInputElement>["onFocus"]>
        >[0],
      ) => {
        setFocused(true);
        _onFocus?.(e);
      },
      [_onFocus],
    );

    const onBlur = useCallback(
      (
        e: Parameters<
          NonNullable<AriaTextFieldProps<HTMLInputElement>["onBlur"]>
        >[0],
      ) => {
        if (keyLockRef.current) {
          keyLockRef.current = false;
        }
        setFocused(false);
        _onBlur?.(e);
      },
      [_onBlur],
    );

    const onFocusChange = useCallback(
      (isFocused: boolean) => {
        setFocused(isFocused);
        _onFocusChange?.(isFocused);
      },
      [_onFocusChange],
    );

    const onReset = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        focus();
        _onClear?.(e);
      },
      [_onClear, focus],
    );

    useEffect(() => {
      if (keyLockRef.current) {
        keyLockRef.current = false;
      }
      setFocused((prev) => (prev && props.isDisabled ? false : prev));
    }, [props.isDisabled]);

    const { inputProps, labelProps } = useTextField(
      {
        ...resetProps,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        onFocusChange,
      },
      inputRef,
    );

    const inputNode = (
      <input
        data-testid="input"
        ref={inputRef}
        autoComplete={autoComplete}
        css={[
          getInputBaseStyle(theme),
          {
            paddingRight: theme.spacing["60px"],
          },
          customCss,
        ]}
        className={mergedClassName}
        {...inputProps}
      />
    );

    let suffixNode: React.ReactNode;
    if (allowClear) {
      suffixNode = (
        <span
          className="input-suffix"
          css={[
            getButtonAllowedWrapperStyle(theme),
            {
              padding: theme.spacing["30px"],
            },
          ]}
        >
          <button
            type="button"
            css={getButtonAllowedClearStyle(
              theme,
              typeof inputProps.value === "string" &&
                inputProps.value.length === 0
                ? true
                : false,
            )}
            data-testid="input-clear"
            onClick={onReset}
          >
            <Icons.Close fill="currentColor" />
          </button>
        </span>
      );
    }

    let labelNode: React.ReactNode;
    if (label) {
      labelNode = <label {...labelProps}>{label}</label>;
    }

    const hasInputWrapper = suffixNode || label ? true : false;

    const InputWrapper = hasInputWrapper ? InputWithSuffix : React.Fragment;

    return (
      <InputWrapper>
        {labelNode}
        {inputNode}
        {suffixNode}
      </InputWrapper>
    );
  },
);

export default Input;
