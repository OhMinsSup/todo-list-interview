"use client";

import React from "react";
import { useTheme } from "@emotion/react";

interface TodoTemplateProps {
  children: React.ReactNode;
}

const TodoTemplate = ({ children }: TodoTemplateProps) => {
  const { sizes, spacing } = useTheme();
  return (
    <div
      css={{
        display: "grid",
        width: sizes.full,
        height: "100svh",
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        "@media (min-width: 768px)": {
          margin: "0 auto",
          padding: `0 ${spacing["32px"]}`,
        },
        "@media (min-width: 1024px)": {
          paddingLeft: 0,
          paddingRight: 0,
          maxWidth: "none",
        },
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: sizes.full,
          margin: 0,
          "@media (min-width: 768px)": {
            marigin: "0 auto",
          },

          "@media (min-width: 1024px)": {
            padding: spacing["32px"],
            width: sizes.md,
          },
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TodoTemplate;
