import prisma from "../utils/prisma";

export const createProduct = async (data: {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description?: string;
}) => {
  return prisma.product.create({
    data,
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    sku?: string;
    price?: number;
    quantity?: number;
    description?: string;
  }
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};