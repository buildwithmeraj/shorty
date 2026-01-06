import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../components/pages/home/Home";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import Dashboard from "../components/pages/dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import CreateLink from "../components/pages/dashboard/CreateLink";
const routes = createBrowserRouter([
  {
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "create",
        element: (
          <PrivateRoutes>
            <CreateLink />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default routes;
