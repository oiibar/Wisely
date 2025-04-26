import { FC, useState } from "react";
import { Transaction } from "@interfaces/transaction.ts";
import { Category } from "@interfaces/category"
import { toast } from "react-toastify";

interface Props {
  categories: Category[];
  onAdd: (newTransaction: Omit<Transaction, "id" | "created_at" | "updated_at">) => void;
}

const TransactionForm: FC<Props> = ({ categories, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: '',
    categoryId: "",
    type: "income",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.id.toString() === formData.categoryId
    );

    if (!formData.title || !formData.amount || !selectedCategory) {
      toast.error("Please fill out all fields");
      return;
    }

    await onAdd({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: selectedCategory,
      type: formData.type,
    });

    setFormData({
      title: "",
      amount: "",
      categoryId: "",
      type: "income",
    });
  };

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            id="title"
            name="title"
            type="text"
            className="input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            pattern="\d*"
            className="input"
            min={0}
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="categoryId" className="grid">
            <span>Category</span>
            <select
              id="categoryId"
              name="categoryId"
              className="input border-slate-700"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="mt-1 text-red-300">Create categories first</p>
        )}

        <div className="flex gap-4 items-center mt-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === "income"}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === "expense"}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-green max-w-fit mt-2"
          disabled={!categories.length}
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default TransactionForm;
