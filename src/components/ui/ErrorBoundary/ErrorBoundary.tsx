"use client";

import React from "react";
import { useTheme } from "@emotion/react";

import { Button } from "~/components/ui/Button";
import { Flex } from "~/components/ui/Flex";
import { Typography } from "~/components/ui/Typography";

interface ErrorBoundaryProps {
  statusCode?: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  buttonText?: string;
}

const ErrorBoundary = ({
  statusCode = 500,
  onClick,
  title = (
    <>
      서버에서 오류가 발생했습니다.
      {`:')`}
    </>
  ),
  description = (
    <>
      불편을 끼쳐드려 죄송합니다. <br /> 나중에 다시 시도해 주세요.
    </>
  ),
  buttonText = "새로고침",
}: ErrorBoundaryProps) => {
  const { palette, sizes, spacing } = useTheme();
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      css={{
        background: palette.backgroundGray,
      }}
    >
      <div
        css={{
          width: sizes.full,
          height: "100svh",
        }}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          css={{
            margin: "auto",
            width: sizes.full,
            height: sizes.full,
            gap: "2rem",
          }}
        >
          <Typography type="title">{statusCode}</Typography>
          <Typography type="global-error-text">{title}</Typography>
          <Typography type="global-error-description-text">
            {description}
          </Typography>
          <div css={{ marginTop: spacing["12px"] }}>
            <Button
              type="button"
              color="default"
              variant="solid"
              onPress={onClick}
            >
              {buttonText}
            </Button>
          </div>
        </Flex>
      </div>
    </Flex>
  );
};

export default ErrorBoundary;
