import { categoryInput, categorySchema } from "../categories/categories.schema";
import * as ProductRepository from "../../config/repositories/products";
import {
  productFilterType,
  productInput,
  searchProductSchemaType,
  updateProductInput,
} from "./products.schema";
import { AppError } from "@/utils/AppError.util";

export const getAllProducts = async ({
  status = "All",
  page = 1,
  limit = 5,
  search = "",
}: searchProductSchemaType) => {
  const filter: productFilterType = {};

  if (search) {
    filter["search"] = search;
  }
  if (status && status != "All") {
    filter["status"] = status;
  }

  const offset = limit * (page - 1);
  return ProductRepository.getAllProducts(filter, limit, offset);
};

export const getProductById = async (id: number) => {
  const getProduct = await ProductRepository.findProductsById(id);

  if (!getProduct) {
    throw new AppError("Product not found", 404, "not found");
  }
};

export const createProduct = async (product: productInput) => {
  const existing = await ProductRepository.createProduct(
    product.category_id,
    product.product_name,
    product.cost_price,
    product.retail_price,
  );

  if (existing) throw new AppError("Product already exists", 400, "existing");
};

export const updateProduct = async (
  id: number,
  productInput: updateProductInput,
) => {
  const product = await ProductRepository.findProductsById(id);

  if (!product) {
    throw new AppError("Product not found", 404, "not found");
  }

  if (productInput.product_name) {
    const existing = await ProductRepository.findProductByName(
      productInput.product_name,
    );
  }
  return ProductRepository.updateProducts(id, productInput);
};

export const deleteProduct = async (id: number) => {
  const existing = await ProductRepository.findProductsById(id);

  if (!existing) {
    throw new AppError("Product not found", 404, "not found");
  }
  return ProductRepository.deleteProduct(id);
};

export const toggleProductStatus = async (id: number) => {
  const existing = await ProductRepository.findProductsById(id);
  if (!existing) {
    throw new AppError("Product not found", 404, "not found");
  }

  const newStatus = existing.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  return ProductRepository.toggleProductStatus(id, newStatus);
};
