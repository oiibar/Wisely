import { FC } from "react";
import img from "@assets/page_not_found.png";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
      <img src={img} alt="not found" className="w-96" />
      <Link
        to={"/"}
        className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600"
      >
        Home page
      </Link>
    </div>
  );
};

export default ErrorPage;
