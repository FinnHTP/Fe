import axios from "axios";

const API_URL = "https://websitegamemanagement.vercel.app/api";

export const searchOrderById = async (searchId, token) => {
    if (!token) {
        console.error("Token not found");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/orders/${searchId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ? [response.data] : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const loadOrder = async (token) => {
    if (!token) {
        console.error("Token not found");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteGames = async (id, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.delete(`${API_URL}/games/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const viewsOrderDetail = async (id, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.get(`${API_URL}/ordersdetail/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
