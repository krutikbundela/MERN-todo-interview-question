import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },
    ],
  },
]);
