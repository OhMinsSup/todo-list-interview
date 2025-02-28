"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { IdSchema, todoTable } from "~/db/schema";
import { action } from "~/libs/safe-actions";

export const deleteTodoAction = action
  .metadata({ actionName: "deleteTodoAction" })
  .schema(IdSchema)
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db
      .delete(todoTable)
      .where(eq(todoTable.id, parsedInput.id))
      .returning();
    revalidatePath("/", "page");
    return { success: true, data: undefined, error: undefined };
  });
