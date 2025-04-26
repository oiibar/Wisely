import { FC } from 'react'
import { Category } from "@interfaces/category";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";

const CategoryItem: FC<{
  category: Category;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ category, onEdit, onDelete }) => (
  <div className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
    {category.title}
    <div className="absolute px-3 inset-0 flex rounded-lg bg-black/90 items-center justify-between opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
      <button onClick={() => onEdit(category.id)}><AiFillEdit /></button>
      <button onClick={() => onDelete(category.id)}><AiFillCloseCircle /></button>
    </div>
  </div>
);

export default CategoryItem;