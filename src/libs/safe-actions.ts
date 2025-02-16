import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";

import "drizzle-orm/d1";

import { getCloudFlareDB } from "~/db/drizzle";
import logger from "~/libs/logger";

export const action = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;

    logger.error("server-action", e.message, e, {
      actionName: metadata.actionName,
      clientInput,
    });

    // Every other error that occurs will be masked with the default message.
    return e.message || DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(({ next }) => {
  const db = getCloudFlareDB();
  return next({ ctx: { db } });
});
