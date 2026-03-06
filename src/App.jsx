import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import { HomePage } from "./components/pages/HomePage";
import { CatalogPage } from "./components/pages/CatalogPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { NewArticlePage } from "./components/pages/NewArticlePage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { LoginPage } from "./components/pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="catalog" element={<CatalogPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* RUTAS QUE FALTABAN */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="newarticle" element={<NewArticlePage />} />
      </Route>
    </Routes>
  );
}
