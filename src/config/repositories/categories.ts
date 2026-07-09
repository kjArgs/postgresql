import { set } from "zod";
import { db } from "../db";
import { UpdateCategory } from "../types/categories";
import { categoryFilterType } from "@/modules/categories/categories.schema";

export const createCategory = async (categoryName: string) => {
  return await db
    .insertInto("categories")
    .values({ category_name: categoryName })
    .returningAll()
    .executeTakeFirst();
};

export const updateCategory = async (id: number, category: UpdateCategory) => {
  return await db
    .updateTable("categories")
    .set(category)
    .where("categories.id", "=", id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteCategory = async (id: number) => {
  return await db
    .deleteFrom("categories")
    .where("categories.id", "=", id)
    .executeTakeFirst();
};

export const getAllCategories = async (
  filter: categoryFilterType,
  limit: number,
  offset: number,
) => {
  //create a variable that selects all from categories table
  let query = db.selectFrom("categories").selectAll();

  //counts the number of row from the categories table
  let countQuery = db
    .selectFrom("categories")
    .select(({ fn }) => [fn.count("id").as("total")]);

  if (filter.search) {
    query = query.where(
      "categories.category_name",
      "ilike",
      `%${filter.search}%`,
    );

    countQuery = countQuery.where(
      "categories.category_name",
      "ilike",
      `%${filter.search}%`,
    );

    if (filter.status) {
      query = query.where("categories.status", "=", filter.status);
      countQuery = countQuery.where("categories.status", "=", filter.status);
    }

    const categories = await query.limit(limit).offset(offset).execute();
    const countResult = await countQuery.executeTakeFirst();

    const total = Number(countResult?.total ?? 0);

    return {
      categories: categories,
      total: total,
      totalPages: Math.ceil(total / limit),
    };
  }
};

export const findById = async (id: number) => {
  return await db
    .selectFrom("categories")
    .selectAll()
    .where("categories.id", "=", id)
    .executeTakeFirst();
};

export const findByName = async (categoryName: string) => {
  return await db
    .selectFrom("categories")
    .selectAll()
    .where("categories.category_name", "=", categoryName)
    .executeTakeFirst();
};

export const toggleCategoryStatus = async (
  id: number,
  newStatus: "ACTIVE" | "INACTIVE",
) => {
  await db
    .updateTable("categories")
    .set({ status: newStatus })
    .where("categories.id", "=", id)
    .returningAll()
    .executeTakeFirst();
};
