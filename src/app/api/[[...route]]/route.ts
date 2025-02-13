import { handle } from "hono/vercel";

import { api } from "~/server";

export const GET = handle(api);
export const POST = handle(api);
