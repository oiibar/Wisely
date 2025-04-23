import { useState } from "react";

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const openCreate = () => {
    setCategoryId(null);
    setIsEdit(false);
    setVisible(true);
  };

  const openEdit = (id: number) => {
    setCategoryId(id);
    setIsEdit(true);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setIsEdit(false);
    setCategoryId(null);
  };

  return {
    visible,
    isEdit,
    categoryId,
    openCreate,
    openEdit,
    close,
  };
};
