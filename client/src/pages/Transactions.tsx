import { FC } from "react";
import TransactionForm from "../components/Transactions/TransactionForm.tsx";
import { instance } from "../api/axios.api";
import {
  Category,
  ResponseTransactionLoader,
  Transaction,
} from "../types/types";
import { toast } from "react-toastify";
import TransactionTable from "../components/Transactions/TransactionTable.tsx";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "../helpers/currency.helper";
import Chart from "../components/Transactions/Chart.tsx";

export const TransactionLoader = async () => {
  const categories = await instance.get<Category[]>("/categories");
  const transactions = await instance.get<Transaction[]>("/transactions");
  const totalIncome = await instance.get<number>("/transactions/income/find");
  const totalExpense = await instance.get<number>("/transactions/expense/find");
  console.log(totalIncome, totalExpense);

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };

  return data;
};

export const TransactionAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get("title"),
        amount: +formData.get("amount"),
        category: formData.get("category"),
        type: formData.get("type"),
      };
      await instance.post("/transactions", newTransaction);
      toast.success("Transaction added successfully");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const transactionId = formData.get("id");
      await instance.delete(`/transactions/transaction/${transactionId}`);
      toast.success("Deleted successfully");
      return null;
    }
  }
};

const Transactions: FC = () => {
  const { totalExpense, totalIncome } =
    useLoaderData() as ResponseTransactionLoader;
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm />
        </div>
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Income:
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                {formatCurrency.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expense:
              </p>
              <p className="bg-red-600 p-1 rounded-sm text-center mt-2">
                {formatCurrency.format(totalExpense)}
              </p>
            </div>
          </div>
          <>
            <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
          </>
        </div>
      </div>

      <h1 className="my-5">
        <TransactionTable limit={5} />
      </h1>
    </>
  );
};

export default Transactions;
