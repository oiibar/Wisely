import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getTotalExpense,
  getTotalIncome
} from "../services/transaction.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Transaction } from "../types/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const [transRes, incomeRes, expenseRes] = await Promise.all([
        getAllTransactions(),
        getTotalIncome(),
        getTotalExpense(),
      ]);

      setTransactions(transRes.data);
      setTotalIncome(incomeRes.data);
      setTotalExpense(expenseRes.data);
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (
    newTransaction: Omit<Transaction, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await addTransaction(newTransaction);
      toast.success("Transaction added successfully");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    totalIncome,
    totalExpense,
    loading,
    fetchTransactions,
    handleAddTransaction,
    handleDeleteTransaction,
  };
};
