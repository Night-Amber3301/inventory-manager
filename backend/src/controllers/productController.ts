import { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator";


export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const product = await createProduct(validatedData);

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Invalid request data",
      error: error.errors || error.message,
    });
  }
};


export const getAllProductsHandler = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};


export const getProductByIdHandler = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};


export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id as string;

    const validatedData = updateProductSchema.parse(req.body);

    const updatedProduct = await updateProduct(id, validatedData);

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Failed to update product",
      error: error.errors || error.message,
    });
  }
};


export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await deleteProduct(id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete product",
    });
  }
};