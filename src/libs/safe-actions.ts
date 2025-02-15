import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";

import { getCloudFlareDB } from "~/db/drizzle";

export const action = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(e) {
    console.error(
      `Next Server Action Error "${e.name || "UnknownError"}" with message "${
        e.message
      }"`,
      {
        name: e.name,
        message: e.message,
        stack: e.stack,
      },
    );

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const db = await getCloudFlareDB();
  return next({ ctx: { db } });
});
