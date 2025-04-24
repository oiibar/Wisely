import { useEffect, useState } from "react";
import { instance } from "../api/axios.api";
import { Transaction } from "../types/types";

export function usePaginatedTransactions(limit: number, totalCount: number) {
  const [data, setData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await instance.get(
          `/transactions/pagination?page=${currentPage}&limit=${limit}`
        );
        setData(response.data);
        setTotalPages(Math.ceil(totalCount / limit));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [currentPage, limit, totalCount]);

  return {
    data,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
