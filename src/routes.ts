import express from "express";
import CategoryRoute from "../src/modules/categories/categories.route";

export const createRoutes = (app: express.Router) => {
  app.use("/api/categories", CategoryRoute);
};
