import type { ContentfulStatusCode } from "hono/utils/http-status";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

import type { DrizzleDatabase } from "~/db/drizzle";
import logger from "~/libs/logger";
import { corsMiddleware } from "~/server/middlewares/cors";
import { databaseMiddleware } from "~/server/middlewares/database";
import { todoRouter } from "~/server/routers/todos";

export interface Env {
  Variables: {
    db: DrizzleDatabase;
  };
}

const app = new Hono().basePath("/api");

export const api = app
  .use(corsMiddleware)
  .use(databaseMiddleware)
  .onError((err) => {
    if (err instanceof ZodError) {
      const httpError = new HTTPException(400, {
        message: "Validation error",
        cause: err,
      });

      return httpError.getResponse();
    } else {
      if (err instanceof HTTPException) {
        logger.error("hono-rpc", err.message, err, {
          status: err.status,
          name: err.name,
        });
        return err.getResponse();
      } else if ("status" in err && typeof err.status === "number") {
        const httpError = new HTTPException(
          err.status as ContentfulStatusCode,
          {
            message: err.message,
            cause: err,
          },
        );
        logger.error("hono-rpc", httpError.message, httpError, {
          status: httpError.status,
          name: httpError.name,
        });
        return httpError.getResponse();
      }

      const httpError = new HTTPException(500, {
        message: "An unexpected error occurred. Check server logs for details.",
        cause: err,
      });
      logger.error("hono-rpc", httpError.message, httpError, {
        status: httpError.status,
        name: httpError.name,
      });

      return httpError.getResponse();
    }
  });

export const routes = api.route("/todos", todoRouter);

export type AppType = typeof routes;
