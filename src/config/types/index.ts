import { CategoriesTable } from "./categories";
import { ProductsTable } from "./product";

export interface Database {
  categories: CategoriesTable;
  products: ProductsTable;
}
