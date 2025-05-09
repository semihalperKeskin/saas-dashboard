import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/main";
import AuthLayout from "~/layouts/auth"; 
import Home from "~/pages/home";
import Login from "~/pages/auth/login";
import Register from "~/pages/auth/register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
