import type { Config } from "jest";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // next.config.js 및 .env 파일을 로드할 Next.js 앱의 경로
  dir: "./",
});

const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

module.exports = createJestConfig(customJestConfig);
