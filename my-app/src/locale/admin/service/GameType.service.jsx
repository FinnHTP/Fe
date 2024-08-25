import axios from 'axios';

const API_URL = 'http://localhost:8080/api/gametypes';

export const getAllGameTypes = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createGameType = async (gameType, token) => {
  const response = await axios.post(API_URL, gameType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteGameType = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGameTypeById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateGameType = async (id, gameType, token) => {
  const response = await axios.put(`${API_URL}/${id}`, gameType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
