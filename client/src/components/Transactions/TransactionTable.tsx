import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Transaction } from "@interfaces/transaction";
import { formatDate } from "@helpers/date.helper";
import { formatCurrency } from "@helpers/currency.helper";
import ReactPaginate from "react-paginate";
import { usePaginatedTransactions } from "@hooks/usePaginatedTransactions";

interface ITransactionTable {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  limit: number;
}

const TransactionTable: FC<ITransactionTable> = ({ transactions, onDelete, limit = 3 }) => {
  const {
    data,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePaginatedTransactions(limit, transactions.length);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-md"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
      />

      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
          <tr>
            <td className="font-bold">№</td>
            <td className="font-bold">Title</td>
            <td className="font-bold">Amount</td>
            <td className="font-bold">Category</td>
            <td className="font-bold">Date</td>
            <td className="text-right">Action</td>
          </tr>
          </thead>
          <tbody>
          {data.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1 + (currentPage - 1) * limit}</td>
              <td>{transaction.title}</td>
              <td className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                {transaction.type === "income"
                  ? `+  ${formatCurrency.format(transaction.amount)}`
                  : `-  ${formatCurrency.format(transaction.amount)}`}
              </td>
              <td>{transaction.category?.title || "Other"}</td>
              <td>{formatDate(transaction.created_at)}</td>
              <td>
                <button
                  className="btn hover:btn-red ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(transaction.id);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
