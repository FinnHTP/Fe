import axios from "axios";

const API_URL = "https://websitegamemanagement.vercel.app/api/keycode";

export const searchKeycodeById = async (searchId, token) => {
    if (!token) {
        console.error("Token not found");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/${searchId}`, {
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

export const loadKeycode = async (token) => {
    if (!token) {
        console.error("Token not found");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/enablekey`, {
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

export const loadKeycodedisable = async (token) => {
    if (!token) {
        console.error("Token not found");
        return [];
    }
    try {
        const response = await axios.get(`${API_URL}/disable`, {
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

export const updateKeycodeStatus = async (id, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.put(
            `${API_URL}/${id}`,
            { status: 0 },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export const viewKeycodes = async (id, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
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

export const addKeycode = async (keycode, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.post(`${API_URL}`, keycode, {
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

export const editKeycodes = async (id, keycode, token) => {
    if (!token) {
        console.error("Token not found");
        return null;
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, keycode, {
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
