import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useCategories } from "@hooks/useCategories";
import { useModal } from "@hooks/useModal";
import CategoriesList from "@components/Categories/CategoriesList";
import Modal from "@components/Modal";

const Categories: FC = () => {
  const { categories, fetchCategories, removeCategory } = useCategories();
  const modal = useModal();

  return (
    <div>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Categories list</h1>

        <CategoriesList
          categories={categories}
          handleEditClick={modal.openEdit}
          handleDeleteCategory={removeCategory}
        />

        <button
          onClick={modal.openCreate}
          className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white"
        >
          <FaPlus />
          <span>Create category</span>
        </button>
      </div>

      {modal.visible && (
        <Modal
          type={modal.isEdit ? "patch" : "post"}
          id={modal.categoryId ?? undefined}
          setVisibleModal={modal.close}
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
};

export default Categories;
