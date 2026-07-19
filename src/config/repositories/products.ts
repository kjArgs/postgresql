import { productFilterType } from "@/modules/products/products.schema";
import { db } from "../db";
import { updateProduct } from "../types/product";
import { DummyDriver } from "kysely";

export const createProduct = async (
  categoryId: number,
  productName: string,
  costPrice: number,
  retailPrice: number,
) => {
  return await db
    .insertInto("products")
    .values({
      category_id: categoryId,
      product_name: productName,
      cost_price: costPrice,
      retail_price: retailPrice,
    })
    .returningAll()
    .executeTakeFirst();
};

export const updateProducts = async (id: number, products: updateProduct) => {
  return await db
    .updateTable("products")
    .set(products)
    .where("products.id", "=", id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteProduct = async (id: number) => {
  return await db
    .deleteFrom("products")
    .where("products.id", "=", id)
    .executeTakeFirst();
};

export const getAllProducts = async (
  filter: productFilterType,
  limit: number,
  offset: number,
) => {
  let query = db.selectFrom("products").selectAll();

  let countQuery = db
    .selectFrom("products")
    .select(({ fn }) => [fn.count("id").as("total")]);

  if (filter.search) {
    query = query.where("products.product_name", "ilike", `%${filter.search}%`);

    countQuery = countQuery.where(
      "products.product_name",
      "ilike",
      `%${filter.search}%`,
    );

    if (filter.status) {
      query = query.where("products.status", "=", filter.status);
      countQuery = countQuery.where("products.status", "=", filter.status);
    }

    const products = await query.limit(limit).offset(offset).execute();
    const countResult = await countQuery.executeTakeFirst();

    const total = Number(countResult?.total ?? 0);

    return {
      products: products,
      total: total,
      totalPage: Math.ceil(total / limit),
    };
  }
};

export const findProductsById = async (id: number) => {
  return await db
    .selectFrom("products")
    .selectAll()
    .where("products.id", "=", id)
    .executeTakeFirst();
};

export const findProductByName = async (productName: string) => {
  return await db
    .selectFrom("products")
    .selectAll()
    .where("products.product_name", "=", productName)
    .executeTakeFirst();
};

export const toggleProductStatus = async (
  id: number,
  newStatus: "ACTIVE" | "INACTIVE",
) => {
  return await db
    .updateTable("products")
    .set({ status: newStatus })
    .where("products.id", "=", id)
    .executeTakeFirst();
};
