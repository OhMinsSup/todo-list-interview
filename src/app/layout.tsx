import React from "react";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import GlobalCss from "~/styles/GlobalCss";
import LayoutEmotion from "./layout.emotion";
import LayoutRecoil from "./layout.recoil";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "myfair front pre-course",
  description: "todolist",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <LayoutEmotion>
          <LayoutRecoil>{children}</LayoutRecoil>
          <GlobalCss />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            closeOnClick
          />
        </LayoutEmotion>
      </body>
    </html>
  );
}
