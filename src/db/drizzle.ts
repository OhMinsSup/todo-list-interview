import type { DrizzleD1Database } from "drizzle-orm/d1";
import { remember } from "@epic-web/remember";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export type DrizzleDatabase = DrizzleD1Database<typeof schema>;

export const getCloudFlareDB = () =>
  remember("cloudflare_db", async () => {
    const { env } = getCloudflareContext();
    return drizzle(env.DATABASE_URL, {
      schema,
      logger: process.env.NODE_ENV === "development" ? true : undefined,
    });
  });
