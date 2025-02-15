"use client";

import React from "react";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";

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
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer position="bottom-right" autoClose={1000} closeOnClick />
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default LayoutEmotion;
