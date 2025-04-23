import { FC, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/TransactionForm";
import TransactionTable from "../components/Transactions/TransactionTable";
import TotalDisplay from "../components/Transactions/TotalDisplay";
import { Category, Transaction } from "../types/types";
import { toast } from "react-toastify";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  getTotalExpense,
  getTotalIncome,
} from "../services/transaction.service";
import { getCategories } from "../services/category.service";

const Transactions: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const fetchAllData = async () => {
    try {
      const [catRes, transRes, incomeRes, expenseRes] = await Promise.all([
        getCategories(),
        getAllTransactions(),
        getTotalIncome(),
        getTotalExpense(),
      ]);

      setCategories(catRes.data);
      setTransactions(transRes.data);
      setTotalIncome(incomeRes.data);
      setTotalExpense(expenseRes.data);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddTransaction = async (
    newTransaction: Omit<Transaction, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await addTransaction(newTransaction);
      toast.success("Transaction added successfully");
      fetchAllData();
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id: number | string) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
      fetchAllData();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm categories={categories} onAdd={handleAddTransaction} />
        </div>
        <TotalDisplay totalIncome={totalIncome} totalExpense={totalExpense} />
      </div>

      <h1 className="my-5">
        <TransactionTable transactions={transactions} onDelete={handleDeleteTransaction} limit={5} />
      </h1>
    </div>
  );
};

export default Transactions;
