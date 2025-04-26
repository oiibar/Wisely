import { instance } from "@api/axios.api";
import { Transaction } from "@interfaces/transaction";

export const getAllTransactions = () => instance.get<Transaction[]>("/transactions");

export const addTransaction = (transaction: Omit<Transaction, "id" | "created_at" | "updated_at">) =>
  instance.post("/transactions", transaction);

export const deleteTransaction = (id: number) =>
  instance.delete(`/transactions/transaction/${id}`);

export const getTotalIncome = () => instance.get<number>("/transactions/income/find");

export const getTotalExpense = () => instance.get<number>("/transactions/expense/find");

export const getPaginatedTransactions = (page: number, limit: number) =>
  instance.get<Transaction[]>(`/transactions/pagination?page=${page}&limit=${limit}`);
