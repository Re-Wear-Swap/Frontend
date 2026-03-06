import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

import { HomePage } from "../components/pages/HomePage";
import { CatalogPage } from "../components/pages/CatalogPage";
import { ProfilePage } from "../components/pages/ProfilePage";
import { NewArticlePage } from "../components/pages/NewArticlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "profile", Component: ProfilePage },
      { path: "profile/new-item", Component: NewArticlePage }

    ],
  },
]);
