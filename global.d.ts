declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string;
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_API_URL: string;
  }
}
