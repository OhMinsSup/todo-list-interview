import { handle } from "hono/vercel";

import { api } from "~/server";

export const GET = handle(api);
