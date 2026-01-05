import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
const routes = createBrowserRouter([
  {
    Component: Root,
    children: [{ index: true, element: <>Hello</> }],
  },
]);
export default routes;
