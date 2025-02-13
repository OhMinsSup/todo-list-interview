import { z } from "zod";

const baseQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  pageNo: z.coerce.number().int().min(1).default(1),
});

const listQuery = baseQuery
  .extend({
    completed: z.coerce.boolean(),
  })
  .partial();

export const query = {
  list: listQuery,
};

export type ListQuerySchema = z.infer<typeof query.list>;
