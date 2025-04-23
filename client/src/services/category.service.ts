import { instance } from "../api/axios.api";
import { Category } from "../types/types";

export const getCategories = () => instance.get<Category[]>("/categories");

export const addCategory = (title: string) =>
  instance.post("/categories", { title });

export const updateCategory = (id: number, title: string) =>
  instance.patch(`/categories/category/${id}`, { title });

export const deleteCategory = (id: number) =>
  instance.delete(`/categories/category/${id}`);

export const getCategoryById = (id: number) =>
  instance.get(`/categories/category/${id}`);
