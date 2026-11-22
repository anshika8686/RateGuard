import { createContext, useState } from "react";
import { signupUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (userData) => {
        try {
            setLoading(true);

            const data = await signupUser(userData);
            setUser(data.user);

            return {
                success: true,
                data
            };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Signup failed"
            };

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signup
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};