import { z } from "zod";
export const PRODUCT_STATUS = ["ACTIVE", "INACTIVE"] as const;

export const productSchema = z.object({
  category_id: z.number().int().positive(),
  product_name: z.string().min(1, "Product name is required"),
  cost_price: z.number().int().positive().default(0),
  retail_price: z.number().int().positive().default(0),
});

export const updateProductSchema = productSchema.partial();

export const searchProductSchema = z.object({
  search: z.string().optional(),
  status: z.enum([...PRODUCT_STATUS, "All"]).default("All"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export type productInput = z.infer<typeof productSchema>;
export type updateProductInput = z.infer<typeof updateProductSchema>;
export type searchProductSchemaType = z.infer<typeof searchProductSchema>;
export type productStatusType = (typeof PRODUCT_STATUS)[number];
export type productFilterType = {
  search?: string;
  status?: productStatusType;
};
