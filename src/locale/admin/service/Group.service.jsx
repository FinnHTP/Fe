import axios from "axios";

const API_URL = "https://websitegamemanagement.vercel.app/api/group";

export const getToken = () => {
  return localStorage.getItem("accesstoken");
};

export const loadGroups = async () => {
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

export const searchGroupById = async (searchId) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return null;
  }
  try {
    const response = await axios.get(`${API_URL}/${searchId}`, {
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

export const createGroup = async (groupData) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.post(API_URL, groupData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGroup = async (id, groupData) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return;
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteGroup = async (id) => {
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

export const viewGroupDetails = async (id) => {
  const token = getToken();
  if (!token) {
    console.error("Token not found");
    return null;
  }
  try {
    const response = await axios.get(`${API_URL}/${id}/details`, {
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
