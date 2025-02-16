import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import { getBaseUrl } from "~/libs/utils";
import GlobalCss from "~/styles/GlobalCss";
import LayoutEmotion from "./layout.emotion";
import LayoutRecoil from "./layout.recoil";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: "TodoList",
  description:
    "This is a Next.js-based TodoList distributed through Cloudflare.",
  openGraph: {
    title: "TodoList",
    description:
      "This is a Next.js-based TodoList distributed through Cloudflare.",
    url: getBaseUrl(),
    siteName: "TodoList",
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lalossol",
    creator: "@Lalossol",
  },
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
