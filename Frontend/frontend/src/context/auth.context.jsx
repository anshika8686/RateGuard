import { createContext, useState, useEffect } from "react";
import { signupUser, loginUser, getMe, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      await fetchUser();
    };

    restoreSession();
  }, []);
  const signup = async (userData) => {
    try {
      setLoading(true);

      const data = await signupUser(userData);
      setUser(data.user);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);

      const data = await loginUser(credentials);

      setUser(data.user);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);

      const data = await getMe();
      setUser(data.user);

      return { success: true, data };
    } catch (error) {
      setUser(null);

      return {
        success: false,
        message: error.response?.data?.message || "Session expired",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
        await logoutUser();
        setUser(null);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Logout failed",
        };
    }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        fetchUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
