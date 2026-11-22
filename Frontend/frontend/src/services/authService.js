import api from "./api";

export const signupUser = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const getMe = async () => {
    const response = await api.get("/auth/get-me");
    return response.data;
};

