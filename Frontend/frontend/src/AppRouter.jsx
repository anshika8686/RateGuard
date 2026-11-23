
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/ApiKeys";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="api-keys" element={<ApiKeys />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
