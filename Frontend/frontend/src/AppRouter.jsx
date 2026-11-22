import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/pages/Auth/Login";
import Signup from "../src/pages/Auth/SignUp";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<Dashboard/>} ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;