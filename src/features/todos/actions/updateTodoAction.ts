"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { todoTable, UpdateTodoSchema } from "~/db/schema";
import { action } from "~/libs/safe-actions";

export const updateTodoAction = action
  .metadata({ actionName: "updateTodoAction" })
  .schema(UpdateTodoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, ...body } = parsedInput;

    const data = await ctx.db
      .update(todoTable)
      .set(body)
      .where(eq(todoTable.id, id))
      .returning();

    const todo = data.find((t) => t.id === id);
    revalidatePath("/", "page");
    return { success: true, data: todo, error: undefined };
  });
