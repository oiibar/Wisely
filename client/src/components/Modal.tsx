import { FC, useEffect, useState } from "react";
import { addCategory, updateCategory, getCategoryById } from "@services/category.service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
interface IModal {
  type: "post" | "patch";
  id?: number;
  setVisibleModal: (visible: boolean) => void;
  fetchCategories: () => void;
}

const Modal: FC<IModal> = ({ type, id, setVisibleModal, fetchCategories }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (type === "patch" && id) {
      setLoading(true);
      getCategoryById(id)
        .then(({ data }) => setTitle(data.title))
        .catch(() => toast.error("Failed to load category data"))
        .finally(() => setLoading(false));
    }
  }, [type, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setSaving(true);
    try {
      if (type === "patch" && id) {
        await updateCategory(id, title);
        toast.success("Category updated successfully!");
      } else {
        await addCategory(title);
        toast.success("Category created successfully!");
      }

      fetchCategories();
      setVisibleModal(false);
    } catch {
      toast.error(type === "patch" ? "Failed to update category" : "Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
      >
        {loading ? (
          <div className="text-center text-white">
            <Loader2 className="animate-spin mx-auto" />
            Loading...
          </div>
        ) : (
          <>
            <label>
              <small className="text-white">Category Title</small>
              <input
                className="input w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <div className="flex items-center gap-2">
              <button
                className="btn btn-green disabled:opacity-50"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-1" />
                    Saving...
                  </>
                ) : type === "patch" ? "Save" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setVisibleModal(false)}
                className="btn btn-red"
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;
