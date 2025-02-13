import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { Env } from "~/server";
import { query } from "~/server/routers/todos/query";

export type HttpErrorData = {
  text: string;
};

const app = new Hono<Env>()
  .get("/list", zValidator("query", query.list), (c) => {
    return c.json(
      {
        success: true,
        data: {
          totalCount: 0,
          list: [],
          pageInfo: {},
        },
        error: undefined,
      },
      200,
    );
  })
  .post("/create", async (c) => {
    return c.json({ success: true, data: null, error: undefined }, 200);
  })
  .post("/update", async (c) => {
    return c.json({ success: true, data: null, error: undefined }, 200);
  })
  .post("/delete", async (c) => {
    return c.json({ success: true, data: null, error: undefined }, 200);
  });

export default app;
