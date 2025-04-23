import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal";
import { Category, Transaction } from "../../types/types";

interface Props {
  categories: Category[];
  onAdd: (newTransaction: Omit<Transaction, "id" | "created_at" | "updated_at">) => void;
}

const TransactionForm: FC<Props> = ({ categories, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat.id.toString() === categoryId);
    if (!title || !amount || !selectedCategory || !type) return;

    await onAdd({
      title,
      amount,
      category: selectedCategory,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategoryId("");
    setType("income");
  };

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="input"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            className="input"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select
              className="input border-slate-700"
              required
              name="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option value={cat.id.toString()} key={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">Create categories first</h1>
        )}

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        <button type="submit" className="btn btn-green max-w-fit mt-2">
          Submit
        </button>
      </form>

      {visible && <Modal type="post" setVisibleModal={setVisible} />}
    </div>
  );
};

export default TransactionForm;
