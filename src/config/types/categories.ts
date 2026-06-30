import { categoryStatusType } from "@/modules/categories/categories.schema";
import { Generated, ColumnType, Selectable, Insertable, Updateable } from "kysely";

export interface CategoriesTable {
  id: Generated<number>;
  category_name: string;
  status: categoryStatusType;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}


export type Category = Selectable<CategoriesTable>;
export type NewCategory = Insertable<CategoriesTable>;
export type UpdateCategory = Updateable<CategoriesTable>;
