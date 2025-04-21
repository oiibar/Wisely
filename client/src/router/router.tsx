import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Transactions, {
  TransactionAction,
  TransactionLoader,
} from "../pages/Transactions";
import Categories, {
  categoriesAction,
  categoryLoader,
} from "../pages/Categories";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "transactions",
        loader: TransactionLoader,
        action: TransactionAction,
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        action: categoriesAction,
        loader: categoryLoader,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

export default router;