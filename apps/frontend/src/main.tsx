import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "~/routes";
import { store } from "~/app/store";
import { Provider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
