import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/pages/Auth/Login";
import Signup from "../src/pages/Auth/SignUp";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;