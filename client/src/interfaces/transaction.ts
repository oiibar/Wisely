import { Category } from "@interfaces/category";

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  type: string;
  category: Category;
  created_at: string;
  updated_at: string;
}