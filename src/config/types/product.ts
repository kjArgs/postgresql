import { productStatusType } from "@/modules/products/products.schema";
import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ProductsTable {
  id: Generated<number>;
  category_id: number;
  product_name: string;
  cost_price: number;
  retail_price: number;
  status: productStatusType | undefined;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export type selectProduct = Selectable<ProductsTable>;
export type newProduct = Insertable<ProductsTable>;
export type updateProduct = Updateable<ProductsTable>;
