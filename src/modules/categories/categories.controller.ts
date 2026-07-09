import { Response, Request, NextFunction } from "express";
import * as CategoryService from "../categories/categories.services";
import {
  categorySchema,
  searchCategorySchema,
  updateCategorySchema,
} from "./categories.schema";
import { idParamSchema } from "@/utils/shared/common.schema";
import { success } from "zod";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = categorySchema.parse(req.body);

    const category = await CategoryService.createCategory(data);

    return res.status(200).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const category = await CategoryService.getCategoryById(id);

    return res.status(200).json({
      status: "success",
      message: "Category data retrieved successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = searchCategorySchema.parse(req.query);

    const data = await CategoryService.getAllCategories(query);

    return res.status(200).json({
      status: "success",
      message: "Category data retrieved successfully",
      data: data?.categories,
      metadata: {
        page: query.page,
        limit: query.limit,
        total: data?.total,
        totalPages: data?.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const toggleCategoryStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    await CategoryService.toggleCategoryStatus(id);

    return res.status(200).json({
      status: "success",
      message: "Category status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    const data = updateCategorySchema.parse(req.body);

    const updateCategory = await CategoryService.updateCategory(id, data);

    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    await CategoryService.deleteCategory(id);

    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
