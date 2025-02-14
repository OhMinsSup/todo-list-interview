import { createId } from "@paralleldrive/cuid2";
import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const todoTable = sqliteTable("todos", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  text: text({
    length: 100,
  }),
  completed: integer({ mode: "boolean" }).default(false),
  createdAt: integer({
    mode: "timestamp",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer({
    mode: "timestamp",
  })
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export type Todo = InferSelectModel<typeof todoTable>;

const schema = {
  id: {
    id: z.string().cuid2(),
  },
  create: {
    text: z
      .string()
      .min(1, "할 일 내용은 최소 1글자 이상이어야 합니다.")
      .max(20, "할 일 내용은 최대 20글자까지 가능합니다."),
    completed: z.boolean().default(false),
  },
  update: {
    id: z.string().cuid2(),
    text: z
      .string()
      .min(1, "할 일 내용은 최소 1글자 이상이어야 합니다.")
      .max(20, "할 일 내용은 최대 20글자까지 가능합니다.")
      .optional(),
    completed: z.boolean().optional(),
  },
};

export const CreateTodoSchema = createInsertSchema(
  todoTable,
  schema.create,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTodoSchemaType = z.infer<typeof CreateTodoSchema>;

export const UpdateTodoSchema = createInsertSchema(
  todoTable,
  schema.update,
).omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateTodoSchemaType = z.infer<typeof UpdateTodoSchema>;

export const IdSchema = createInsertSchema(todoTable, schema.id).omit({
  text: true,
  completed: true,
  createdAt: true,
  updatedAt: true,
});

export type IdSchemaType = z.infer<typeof IdSchema>;
