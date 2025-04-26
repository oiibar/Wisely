import { FC } from "react";
import { Category } from "@interfaces/category";
import CategoryItem from "@components/Categories/CategoryItem";
interface Props {
  categories: Category[];
  handleEditClick: (id: number) => void;
  handleDeleteCategory: (id: number) => void
}

const CategoriesList: FC<Props> = ({ categories, handleEditClick, handleDeleteCategory }) => (
  <div className="flex mt-2 items-center gap-2 flex-wrap">
    {categories.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        onEdit={handleEditClick}
        onDelete={handleDeleteCategory}
      />
    ))}
  </div>
);


export default CategoriesList;
