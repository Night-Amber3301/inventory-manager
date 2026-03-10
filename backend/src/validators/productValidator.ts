import { z } from "zod";

export const createProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required")
        .max(100, "Product name too long"),

    sku:  z
        .string()
        .min(1, "SKU is required")
        .max(50, "SKU too long"),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(0, "Quantity cannot be negative"),

    description: z
        .string()
        .max(500, "Description too long")
        .optional()
});

export const updateProductSchema = createProductSchema.partial();