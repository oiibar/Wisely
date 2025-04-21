import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import { instance } from "../api/axios.api";
import { Category } from "../types/types";

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = {
        title: formData.get("title"),
      };
      await instance.post("/categories", title);
      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const category = {
        id: formData.get("id"),
        title: formData.get("title"),
      };
      await instance.patch(`/categories/category/${category.id}`, category);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const category = formData.get("id");
      await instance.delete(`/categories/category/${category}`);
      return null;
    }
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get<Category>("/categories");
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as Category[];

  const [visible, setVisible] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Categories list</h1>

        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
            >
              {category.title}
              <div className="absolute px-3 left-0 top-0 bottom-0 right-0 hidden flex rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button
                  onClick={() => {
                    setVisible(true);
                    setCategoryId(category.id);
                    setIsEdit(true);
                  }}
                >
                  <AiFillEdit />
                </button>

                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setVisible(!visible);
          }}
          className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white"
        >
          <FaPlus></FaPlus>
          <span>Create category</span>
        </button>
      </div>

      {visible && <Modal type="post" setVisibleModal={setVisible}></Modal>}
      {visible && isEdit && (
        <Modal
          type="patch"
          id={categoryId}
          setVisibleModal={setVisible}
        ></Modal>
      )}
    </>
  );
};

export default Categories;
