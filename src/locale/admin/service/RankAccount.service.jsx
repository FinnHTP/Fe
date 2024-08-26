import axios from "axios";

const API_URL = "https://websitegamemanagement.vercel.app/api/rankaccount";

const getToken = () => {
  return localStorage.getItem("accesstoken");
};

export const loadRankAccounts = async () => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return [];
  }
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createRankAccount = async (rankAccount) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.post(API_URL, rankAccount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRankAccount = async (id, rankAccount) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, rankAccount, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRankAccount = async (id) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const viewRankAccount = async (id) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
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
  }
};
