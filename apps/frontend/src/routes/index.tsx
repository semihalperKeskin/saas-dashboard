import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/layouts/main";
import AuthLayout from "~/layouts/auth";
import Board from "~/pages/board";
import Login from "~/pages/auth/login";
import Register from "~/pages/auth/register";
import PrivateRoute from "~/components/privateRoute";
import Profile from "~/pages/profile";
import Statistics from "~/pages/statistics";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Board />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "statistics",
        element: <Statistics />,
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
