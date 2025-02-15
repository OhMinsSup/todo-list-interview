import { createMiddleware } from "hono/factory";

import type { Env } from "~/server";
import { getCloudFlareDB } from "~/db/drizzle";

export const databaseMiddleware = createMiddleware<Env>(async (c, next) => {
  const db = await getCloudFlareDB();
  c.set("db", db);
  await next();
});
