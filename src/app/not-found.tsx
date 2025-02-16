"use client";

import { useRouter } from "next/navigation";

import ErrorBoundary from "~/components/ui/ErrorBoundary/ErrorBoundary";

const GlobalError = () => {
  const router = useRouter();

  return (
    <ErrorBoundary
      statusCode={404}
      title={
        <>
          페이지를 찾을 수 없습니다.
          {`:')`}
        </>
      }
      description={
        <>
          요청하신 페이지를 찾을 수 없습니다. <br /> 다시 한 번 확인해 주세요.
        </>
      }
      onClick={() => router.replace("/")}
    />
  );
};

export default GlobalError;
