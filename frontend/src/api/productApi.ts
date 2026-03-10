import axiosInstance from "./axiosInstance";

export const getProducts = () => {
  return axiosInstance.get("/products");
};

export const createProduct = (data: {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description?: string;
}) => {
  return axiosInstance.post("/products", data);
};

export const updateProduct = (id: string, data: any) => {
  return axiosInstance.patch(`/products/${id}`, data);
};

export const deleteProduct = (id: string) => {
  return axiosInstance.delete(`/products/${id}`);
};