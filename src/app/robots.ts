import { getBaseUrl } from "~/libs/utils";

const baseUrl = getBaseUrl();

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    host: baseUrl,
  };
}
