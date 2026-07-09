import { Router } from "express";
import * as CategoryHandlers from "../categories/categories.controller";

const router = Router();

router.get("/", CategoryHandlers.getAllCategories);
router.post("/", CategoryHandlers.createCategory);
router.patch(
  "/:id/toggle-status",
  CategoryHandlers.toggleCategoryStatusHandler,
);

router.get("/:id", CategoryHandlers.getCategoryById);
router.get("/id", CategoryHandlers.updateCategoryHandler);
router.delete("/:id", CategoryHandlers.deleteCategoryHandler);

export default router;
