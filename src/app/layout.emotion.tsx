"use client";

import React from "react";
import { ThemeProvider } from "@emotion/react";

import NextAppDirEmotionCacheProvider from "~/styles/NextAppDirEmotionCacheProvider";
import { theme } from "~/styles/theme";

interface Props {
  children: React.ReactNode;
}

const LayoutEmotion = ({ children }: Props) => {
  return (
    <NextAppDirEmotionCacheProvider
      options={{
        key: "css",
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default LayoutEmotion;
