import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../components/pages/home/Home";
import Login from "../components/auth/Login";
const routes = createBrowserRouter([
  {
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
    ],
  },
]);
export default routes;
