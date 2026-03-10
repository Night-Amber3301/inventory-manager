import axiosInstance from "./axiosInstance";

export const registerUser = (email: string, password: string) => {
  return axiosInstance.post("/auth/register", { email, password });
};

export const loginUser = (email: string, password: string) => {
  return axiosInstance.post("/auth/login", { email, password });
};

export const getProfile = () => {
  return axiosInstance.get("/auth/profile");
};