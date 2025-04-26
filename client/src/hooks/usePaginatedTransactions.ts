import { useEffect, useState } from "react";
import { Transaction } from "@interfaces/transaction";
import { getPaginatedTransactions } from "@services/transaction.service";
import { useAsync } from "@hooks/useAsync";

export function usePaginatedTransactions(limit: number, totalCount: number) {
  const [data, setData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = useAsync(async () => {
    const response = await getPaginatedTransactions(currentPage, limit);
    setData(response.data);
    setTotalPages(Math.ceil(totalCount / limit));
  });

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, limit, totalCount]);

  return {
    data,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
