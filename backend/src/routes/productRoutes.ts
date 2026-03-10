import { Router } from "express";

import {
  createProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler
} from "../controllers/productController";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

/* Create Product */
router.post("/", authenticate, createProductHandler);

/* Get All Products */
router.get("/", authenticate, getAllProductsHandler);

/* Get Product By ID */
router.get("/:id", authenticate, getProductByIdHandler);

/* Update Product */
router.patch("/:id", authenticate, updateProductHandler);

/* Delete Product */
router.delete("/:id", authenticate, deleteProductHandler);

export default router;