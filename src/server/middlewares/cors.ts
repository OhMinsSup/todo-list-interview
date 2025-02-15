import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

export const corsMiddleware = createMiddleware(async (c, next) => {
  const corsMiddlewareHandler = cors({
    // origin: c.env.CORS_ORIGIN,
    origin: (origin) => origin,
  });
  return corsMiddlewareHandler(c, next);
});
