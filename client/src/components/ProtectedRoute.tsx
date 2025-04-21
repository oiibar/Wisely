import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import err from "../assets/err.png";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <div>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 gap-10">
          <h1 className="text-2xl">
            Cannot access page, try logging in first.
          </h1>
          <img src={err} className="w-80" alt="err" />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
