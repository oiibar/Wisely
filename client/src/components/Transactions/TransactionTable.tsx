import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ResponseTransactionLoader, Transaction } from "../../types/types.ts";
import { formatDate } from "../../helpers/date.helper.ts";
import { formatCurrency } from "../../helpers/currency.helper.ts";
import { instance } from "../../api/axios.api.ts";
import ReactPaginate from "react-paginate";

interface ITransactionTable {
  limit: number;
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as ResponseTransactionLoader;

  const [data, setData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async (page: number) => {
    const response = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setData(response.data);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

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
            {data.map((transaction, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type == "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction.type == "income"
                    ? `+  ${formatCurrency.format(transaction.amount)}`
                    : `-  ${formatCurrency.format(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || "Other"}</td>
                <td>{formatDate(transaction.created_at)}</td>
                <td>
                  <Form method="DELETE" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
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
