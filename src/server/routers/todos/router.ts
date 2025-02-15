import { zValidator } from "@hono/zod-validator";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

import type { Env } from "~/server";
import { todoTable } from "~/db/schema";
import { query } from "~/server/routers/todos/query";

export interface HttpErrorData {
  text: string;
}

const app = new Hono<Env>().get(
  "/",
  zValidator("query", query.list),
  async (c) => {
    const { pageNo = 1, limit = 10, completed } = c.req.valid("query");
    const db = c.get("db");

    const $where =
      typeof completed === "undefined"
        ? undefined
        : eq(todoTable.completed, completed === "true");

    const $count = db.$count(todoTable, $where);

    const $data = db
      .select()
      .from(todoTable)
      .where($where)
      .limit(limit)
      .offset((pageNo - 1) * limit)
      .orderBy(desc(todoTable.createdAt));

    const [totalCount, data] = await Promise.all([$count, $data]);

    const hasNextPage = limit ? totalCount > pageNo * limit : false;
    const nextPage = limit ? (hasNextPage ? pageNo + 1 : null) : null;

    return c.json(
      {
        success: true,
        data: {
          totalCount,
          list: data,
          pageInfo: {
            currentPage: pageNo,
            hasNextPage,
            nextPage,
          },
        },
        error: undefined,
      },
      200,
    );
  },
);

export default app;
