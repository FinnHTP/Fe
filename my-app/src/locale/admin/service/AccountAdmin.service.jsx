import axios from "axios";

const API_URL = "http://localhost:8080/api/account";

const getToken = () => {
  return localStorage.getItem("accesstoken");
};

export const loadAccounts = async () => {
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

export const createAccount = async (account) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.post(API_URL, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = async (id, account) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.put(`http://localhost:8080/api/account/${id}/accountBalance`, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (id) => {
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

export const viewAccount = async (id) => {
  const token = getToken();
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


export const getUser = async (username) => {
    const token = getToken();
    if (!token) {
      console.error("Token not found");
      return [];
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/account/username/${username}`, {
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