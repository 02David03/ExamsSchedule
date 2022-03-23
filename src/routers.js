import React from "react";
import { BrowserRouter, Routes ,Route, Navigate, Outlet} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import TransparencyPage from "./pages/TransparencyPage";
import RegisterPage from "./pages/RegisterPage";
import SchedulesPage from "./pages/SchedulesPage";
import NewSchedulePage from "./pages/NewSchedulePage";
import { isAuthenticated } from "./requests/Authentication";

export default function Routers() {

  const ProtectedRoute = ({ redirectPath = '/' }) => {
    if (!isAuthenticated()) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="transparency" element={<TransparencyPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="schedules" element={<SchedulesPage />} />
          <Route path="newSchedule" element={<NewSchedulePage />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}
