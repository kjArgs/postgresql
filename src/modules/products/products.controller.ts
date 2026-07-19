import { Request, Response, NextFunction } from "express";
import * as ProductServices from "./products.services";
import {
  productSchema,
  searchProductSchema,
  updateProductSchema,
} from "./products.schema";
import { success } from "zod";
import { idParamSchema } from "@/utils/shared/common.schema";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = productSchema.parse(req.body);

    const product = await ProductServices.createProduct(data);

    return res.status(200).json({
      status: success,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const product = await ProductServices.getProductById(id);

    return res.status(200).json({
      status: success,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = searchProductSchema.parse(req.query);
    const product = await ProductServices.getAllProducts(query);

    return res.status(200).json({
      status: success,
      message: "Products successfully retrieved",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleProductStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);

    await ProductServices.toggleProductStatus(id);

    return res.status(200).json({
      status: "success",
      message: "Product status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = updateProductSchema.parse(req.body);
    const updateCategory = await ProductServices.updateProduct(id, data);

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = await idParamSchema.parse(req.params);

    await ProductServices.deleteProduct(id);
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
