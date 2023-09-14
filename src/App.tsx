import Home from "./pages/home/Home";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Books from "./pages/books/Books";
import Groups from "./pages/groups/Groups";
import Questions from "./pages/questions/Questions";
import AuthService from "./api/auth/AuthService";
import { useEffect, useState } from "react";
import { UserType } from "./types/user";
import Loading from "./pages/loading/Loading";
import Memberships from "./pages/logs/Memberships";
import UserDetail from "./pages/users/UserDetail";
import Collections from "./pages/logs/Collections";
import Records from "./pages/logs/Records";
import Logs from "./pages/logs/Logs";

const queryClient = new QueryClient();

const App = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user: UserType = await AuthService.getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);
  const Layout = () => {
    return (
      <div className="main">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <div className="container">
              <div className="menuContainer">
                <Menu />
              </div>
              <div className="contentContainer">
                <Outlet />
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/:userId",
          element: <UserDetail />,
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/questions",
          element: <Questions />,
        },
        {
          path: "/logs",
          element: <Memberships />,
        },
        {
          path: "/logs/:collectionId",
          element: <Collections />,
        },
        {
          path: "/logs/:collectionId/:recordId",
          element: <Records />,
        },
        {
          path: "/logs/:collectionId/:recordId/:logId",
          element: <Logs />,
        },
        // 他のルート定義
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App; // App コンポーネントをエクスポート
