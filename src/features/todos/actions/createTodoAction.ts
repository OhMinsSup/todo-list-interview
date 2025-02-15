"use server";

import { CreateTodoSchema, todoTable } from "~/db/schema";
import { action } from "~/libs/safe-actions";

export const createTodoAction = action
  .metadata({ actionName: "createTodoAction" })
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const data = await ctx.db.insert(todoTable).values(parsedInput).returning();
    const todo = data[data.length - 1];
    return { success: true, data: todo, error: undefined };
  });
