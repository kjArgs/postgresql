import express from "express";
import CategoryRoute from "../src/modules/categories/categories.route";
import ProductsRoute from "../src/modules/products/product.routes";

export const createRoutes = (app: express.Router) => {
  app.use("/api/categories", CategoryRoute);
  app.use("api/products", ProductsRoute);
};
