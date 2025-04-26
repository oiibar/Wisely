import React from "react";
import { formatCurrency } from "@helpers/currency.helper.ts";
import Chart from "@components/Transactions/Chart.tsx";

interface Props {
  totalIncome: number;
  totalExpense: number;
}

const TotalDisplay: React.FC<Props> = ({totalIncome, totalExpense}) => (
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
);

export default TotalDisplay;