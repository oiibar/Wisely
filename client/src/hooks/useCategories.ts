import { useCallback, useEffect, useState } from "react";
import { Category } from "@interfaces/category";
import { getCategories, deleteCategory } from "@services/category.service";
import { useAsync } from "@hooks/useAsync";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const safeGetCategories = useAsync(getCategories);
  const safeDeleteCategory = useAsync(deleteCategory);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await safeGetCategories();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }, [safeGetCategories]);

  const removeCategory = useCallback(async (id: number) => {
    await safeDeleteCategory(id);
    setCategories(prev => prev.filter(cat => cat.id !== id));
  }, [safeDeleteCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    fetchCategories,
    removeCategory,
  };
};
