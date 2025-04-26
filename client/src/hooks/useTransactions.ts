import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getTotalExpense,
  getTotalIncome
} from "@services/transaction.service";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "@interfaces/transaction";
import { useAsync } from "@hooks/useAsync";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const safeGetAll = useAsync(getAllTransactions);
  const safeGetIncome = useAsync(getTotalIncome);
  const safeGetExpense = useAsync(getTotalExpense);
  const safeAdd = useAsync(addTransaction);
  const safeDelete = useAsync(deleteTransaction);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const [transRes, incomeRes, expenseRes] = await Promise.all([
        safeGetAll(),
        safeGetIncome(),
        safeGetExpense(),
      ]);

      setTransactions(transRes.data);
      setTotalIncome(incomeRes.data);
      setTotalExpense(expenseRes.data);
    } finally {
      setLoading(false);
    }
  }, [safeGetAll, safeGetIncome, safeGetExpense]);

  const handleAddTransaction = useCallback(async (
    newTransaction: Omit<Transaction, "id" | "created_at" | "updated_at">
  ) => {
    const response = await safeAdd(newTransaction);
    const added = response.data as Transaction;
    setTransactions(prev => [...prev, added]);

    if (added.type === "income") {
      setTotalIncome(prev => prev + added.amount);
    } else {
      setTotalExpense(prev => prev + added.amount);
    }

  }, [safeAdd]);

  const handleDeleteTransaction = useCallback(async (id: number) => {
    await safeDelete(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [safeDelete]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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
