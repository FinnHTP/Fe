import axios from "axios";

export const getToken = () => {
  const token = localStorage.getItem("accesstoken");
  if (!token) {
    console.error("Token not found");
    return null;
  }
  return token;
};

export const loadUsers = async () => {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      "https://websitegamemanagement.vercel.app/api/account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addAccount = async (account) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.post(
      "https://websitegamemanagement.vercel.app/api/account",
      account,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (id) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.delete(
      `https://websitegamemanagement.vercel.app/api/account/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const viewAccount = async (id) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.get(
      `https://websitegamemanagement.vercel.app/api/account/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = async (id, account) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.put(
      `https://websitegamemanagement.vercel.app/api/account/${id}`,
      account,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchAccountByUsername = async (username) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.get(
      `https://websitegamemanagement.vercel.app/api/account/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
