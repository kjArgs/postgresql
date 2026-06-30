import { z } from "zod";

//define category status
export const CATEGORY_STATUS = ["Active", "Inactive"] as const;

//define the schema
export const categorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
});

export const updateCategorySchema = categorySchema.partial();

export const searchCategorySchema = z.object({
  search: z.string().optional(),
  status: z.enum([...CATEGORY_STATUS, "All"]).default("All"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export type categoryInput = z.infer<typeof categorySchema>;
export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
export type searchCategorySchemaTypes = z.infer<typeof searchCategorySchema>;
export type categoryStatusType = (typeof CATEGORY_STATUS)[number];
export type categoryFilterType = {
  search?: string;
  status?: searchCategorySchemaTypes;
};
