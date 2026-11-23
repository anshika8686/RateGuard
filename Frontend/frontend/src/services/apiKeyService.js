
import api from "./api";

export const createApiKey = async (keyData) => {
    const response = await api.post("/createkeys", keyData);
    return response.data;
};

export const fetchApiKeys = async () => {
    const response = await api.get("/fetchkeys");
    return response.data;
};

export const updateApiKey = async (id, keyData) => {
    const response = await api.patch(`/updatekeys/${id}`, keyData);
    return response.data;
};

export const deleteApiKey = async (id) => {
    const response = await api.delete(`/deletekeys/${id}`);
    return response.data;
};
