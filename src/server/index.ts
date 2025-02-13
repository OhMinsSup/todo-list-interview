import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";

import { corsMiddleware } from "~/server/middlewares/corsMiddleware";
import { todoRouter } from "~/server/routers/todos";

export type Env = {
  Variables: {};
};

const app = new Hono().basePath("/api");

export const api = app.use(corsMiddleware).onError((err) => {
  console.error("[API Error]", err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  } else if (err instanceof ZodError) {
    const httpError = new HTTPException(400, {
      message: "Validation error",
      cause: err,
    });

    return httpError.getResponse();
  } else if ("status" in err && typeof err.status === "number") {
    const httpError = new HTTPException(err.status as ContentfulStatusCode, {
      message: err.message || "API Error",
      cause: err,
    });

    return httpError.getResponse();
  }

  const httpError = new HTTPException(500, {
    message: "An unexpected error occurred. Check server logs for details.",
    cause: err,
  });

  return httpError.getResponse();
});

const routes = api.route("/todos", todoRouter);

export type AppType = typeof routes;
