import {
  categoryStatusType,
  searchCategorySchema,
  searchCategorySchemaTypes,
  categoryFilterType,
  categoryInput,
  updateCategoryInput,
} from "./categories.schema";
import * as CategoryRepository from "../../config/repositories/categories";
import { AppError } from "@/utils/AppError.util";

export const getAllCategories = async ({
  status = "All",
  page = 1,
  limit = 5,
  search = "",
}: searchCategorySchemaTypes) => {
  const filter: categoryFilterType = {};

  if (search) {
    filter["search"] = search;
  }

  if (status && status !== "All") {
    filter["status"] = status;
  }

  const offset = limit * (page - 1);
  return CategoryRepository.getAllCategories(filter, limit, offset);
};

export const getCategoryById = async (id: number) => {
  const getCategory = await CategoryRepository.findById(id);

  if (!getCategory) {
    throw new AppError("Category not found", 404, "not found");
  }
};


export const createCategory = async (category: categoryInput) => {
  const existing = await CategoryRepository.createCategory(category.category_name);

  if (!existing) {
    throw new AppError("Category already exists", 400, "existing");
  }
};

export const updateCategory = async (
  id: number,
  categoryInput: updateCategoryInput,
) => {
  const category = await CategoryRepository.findById(id);

  if (!category) {
    throw new AppError("Category not found", 404, "not found");
  }

  if (categoryInput.category_name) {
    const existing = await CategoryRepository.findByName(
      categoryInput.category_name,
    );
  }

  return CategoryRepository.updateCategory(id, categoryInput);
};

export const toggleCategoryStatus = async (id: number) => {
  const existing = await CategoryRepository.findById(id);

  if (!existing) {
    throw new AppError("Category not found", 404, "not found");
  }
  const newStatus = existing.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  return await CategoryRepository.toggleCategoryStatus(id, newStatus);
};

export const deleteCategory = async (id: number) => {
    const existing = await CategoryRepository.findById(id)

    if (!existing) {
        throw new AppError('Category already exists', 400, 'existing')
    }

    return await CategoryRepository.deleteCategory(id)
}