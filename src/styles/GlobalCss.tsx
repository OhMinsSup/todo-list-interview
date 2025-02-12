"use client";

import React from "react";
import { Global } from "@emotion/react";

import { globalCss } from "~/styles/theme/global-css";

const GlobalCss = () => {
  return <Global styles={[globalCss]} />;
};

export default GlobalCss;
