import { FC } from "react";
import TransactionForm from "../components/Transactions/TransactionForm";
import TransactionTable from "../components/Transactions/TransactionTable";
import TotalDisplay from "../components/Transactions/TotalDisplay";
import { useCategories } from "../hooks/useCategories";
import { useTransactions } from "../hooks/useTransactions";

const Transactions: FC = () => {
  const { categories } = useCategories();
  const {
    transactions,
    totalIncome,
    totalExpense,
    handleAddTransaction,
    handleDeleteTransaction,
  } = useTransactions();

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
