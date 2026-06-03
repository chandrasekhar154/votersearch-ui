import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import RegistrationPage from "../components/Registration/RegistrationPage";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Register" element={<RegistrationPage />} />
        <Route path="/chat" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
