"use client";

import { useEffect } from "react";

import ErrorBoundary from "~/components/ui/ErrorBoundary/ErrorBoundary";
import LayoutEmotion from "./layout.emotion";

interface ErrorWithDigest {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const GlobalError = ({ error, reset }: ErrorWithDigest) => {
  useEffect(() => {
    // logger
  }, [error]);

  return (
    <html>
      <body>
        <LayoutEmotion>
          <ErrorBoundary onClick={reset} />
        </LayoutEmotion>
      </body>
    </html>
  );
};

export default GlobalError;
