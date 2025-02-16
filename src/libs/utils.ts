export const getBaseUrl = () => {
  return new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000");
};
