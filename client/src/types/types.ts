export interface UserData {
  email: string;
  password: string;
}

export interface ResponseUser {
  email: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface ResponseUserData {
  token: string;
  user: ResponseUser;
}

export interface User {
  email: string;
  token: string;
  id: number;
}

export interface Category {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface ResponseTransactionLoader {
  categories: Category[];
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
}

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  type: string;
  category: Category;
  created_at: string;
  updated_at: string;
}
