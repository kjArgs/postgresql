import de from "zod/v4/locales/de.js";
import * as ProductHandler from "./products.controller";
import { Router } from "express";

const router = Router();

router.get("/", ProductHandler.getAllProducts);
router.post("/", ProductHandler.createProduct);
router.patch("/:id/toggle-status", ProductHandler.toggleProductStatusHandler);
router.get("/:id", ProductHandler.getProductById);
router.get("/:id", ProductHandler.updateProductHandler);
router.delete("/:id", ProductHandler.deleteProductHandler);

export default router;
