"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { CreateTodoSchema, todoTable } from "~/db/schema";
import { action } from "~/libs/safe-actions";

export const createTodoAction = action
  .metadata({ actionName: "createTodoAction" })
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const uncompletedCount = await ctx.db.$count(
      todoTable,
      eq(todoTable.completed, false),
    );

    if (uncompletedCount >= 10) {
      return {
        success: false,
        data: undefined,
        error: {
          code: "TOO_MANY_UNCOMPLETED_TODO",
          message: `완료되지 않은 할 일이 10개 이상입니다.`,
        },
      };
    }

    const data = await ctx.db.insert(todoTable).values(parsedInput).returning();
    const todo = data[data.length - 1];
    revalidatePath("/", "page");
    return { success: true, data: todo, error: undefined };
  });
