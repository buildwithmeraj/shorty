import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../components/pages/home/Home";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import Dashboard from "../components/pages/dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Shorten from "../components/pages/dashboard/Shorten";

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
        path: "shorten",
        element: (
          <PrivateRoutes>
            <Shorten />
          </PrivateRoutes>
        ),
      },
    ],
  },
  // Short URL redirector - outside Root layout
  {
    path: ":shortTag",
    loader: async ({ params }) => {
      const { shortTag } = params;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/links/${shortTag}`
        );

        if (!res.ok) {
          return { error: "Short URL not found", shortTag };
        }

        const data = await res.json();

        if (data.targetURL) {
          // Redirect immediately
          window.location.href = data.targetURL;
          return null;
        }

        return { error: "Invalid short URL", shortTag };
      } catch (error) {
        return {
          error: `Failed to load short URL: ${shortTag}, Error: ${error.message}`,
        };
      }
    },
  },
]);

export default routes;
